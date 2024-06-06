import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import CardProjectDonation from '@/components/ui/cardProjectDonation/CardProjectDonation'
import CardProjectVote from '@/components/ui/cardProjectVote/CardProjectVote'
import { Project as ProjectModel } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { AppDispatch, useAppSelector } from '@/store'
import { getLastRound } from '@/store/thunks/round.thunk'
import { convertTimestampToDate } from '@/utils'
import { myContext } from '@/utils/context/context'

import GithubSVG from '../../../assets/svg/projectsComponents/IconGithub.svg'
import TwitterSVG from '../../../assets/svg/projectsComponents/IconTwitter.svg'
import WebsiteSVG from '../../../assets/svg/projectsComponents/IconWebsite.svg'

type Props = {
	project: ProjectModel
}

export default function Project(props: Props): JSX.Element {
	const { project } = props
	const {
		activeProgressVote,
		setActiveProgressVote,
		activePopUpVote,
		setActivePopUpVote
	} = useContext(myContext)

	const [copyText, setCopyText] = useState(project.recipientId)

	const classDisplay = !activePopUpVote ? 'flex' : 'hidden'

	const takeValue = () => {
		navigator.clipboard
			.writeText(copyText)
			.then(() => {
				alert('Copied!')
			})
			.catch(err => {
				alert(err)
			})
	}

	const { address } = useAccount()

	const dispatch = useDispatch<AppDispatch>()

	const [allocationEndTime, setAllocationEndTime] = useState<Date>(new Date())
	const [allocationStartTime, setAllocationStartTime] = useState<Date>(
		new Date()
	)
	const round: Round = useAppSelector(state => state.round.lastRound)

	const lastRoundFetched = useAppSelector(state => state.round.lastRoundFetched)

	const getStates = async () => {
		setAllocationEndTime(
			new Date(convertTimestampToDate(round.allocationEndTime))
		)
		setAllocationStartTime(
			new Date(convertTimestampToDate(round.allocationStartTime))
		)
	}

	useEffect(() => {
		getStates()
		if (!lastRoundFetched) {
			dispatch(getLastRound())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<>
			{activePopUpVote ? (
				<section className='flex flex-col gap-5'>
					<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
						<h2 className='text-secdcolor'>Vote For This Project</h2>
					</div>
					<section className='flex flex-col items-center w-full h-fit gap-5 mt-16'>
						{activeProgressVote === 1 ? (
							<CardProjectVote />
						) : activeProgressVote === 2 ? (
							<CardProjectDonation round={round} project={project} />
						) : null}
					</section>
				</section>
			) : (
				<section className={`${classDisplay} flex-col gap-5`}>
					<figure className='relative'>
						<img
							className='w-full max-h-[450px] rounded-xl'
							src={project.banner}
							alt='Img Project'
						/>
						<img
							className='absolute bottom-0 left-0 w-[200px] h-[150px] rounded-xl'
							src={project.logo}
							alt='Img logo'
						/>
					</figure>
					<div className='flex justify-between items-center'>
						<div>
							<h2>{project.name}</h2>
							<h4 className='text-textdesc'>{project.slogan}</h4>
						</div>
						{round.distributed && (
							<header>
								<h4 className=''>Distributed:</h4>
								<h5>{project.amountDistributed}</h5>
							</header>
						)}
						{!round.distributed && Date.now() > allocationEndTime.getTime() && (
							<button
								className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
							>
								Waiting distribution
							</button>
						)}
						{project.recipientId !== address &&
							Date.now() > allocationStartTime.getTime() &&
							Date.now() < allocationEndTime.getTime() && (
								<button
									onClick={() => {
										setActivePopUpVote(true)
										setActiveProgressVote(1)
									}}
									className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
								>
									<p className='text-pricolor text-fontL'>Vote For Us</p>
								</button>
							)}
						<div></div>
					</div>
					<article className='my-5'>
						<h4>About this project</h4>
						<p>{project.description}</p>
					</article>
					<section className='extraInfo__container'>
						<div className='tags flex flex-col gap-3'>
							<h4>Tags</h4>
							<div className='flex gap-2 flex-wrap'>
								{project.tags.map((tag: string, index: number) => (
									<span
										className='text-pricolor bg-secdcolor rounded-full px-3 py-1'
										key={index}
									>
										{tag}
									</span>
								))}
							</div>
						</div>
						<div className='wallet flex flex-col gap-3'>
							<div className='flex justify-between items-center'>
								<h4>Address Wallet</h4>
								<button
									onClick={takeValue}
									className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
								>
									<p className='text-pricolor'>Copy Wallet</p>
								</button>
							</div>
							<p className='text-fontM rounded-lg px-2 py-1 border-2 border-secdcolor'>
								{project.recipientId}
							</p>
						</div>
						<div className='extraInfo flex gap-12 mt-5'>
							<div>
								<h4>Distribute</h4>
								<p className='text-fontM'>💰 {project.amountDistributed} Doc</p>
							</div>
							<div>
								<h4>Media</h4>
								<div className='flex gap-6'>
									<a href={project.github}>
										<img src={GithubSVG} alt='Icon Network' />
									</a>
									<a href={project.twitter}>
										<img src={TwitterSVG} alt='Icon Network' />
									</a>
									<a href={project.website}>
										<img src={WebsiteSVG} alt='Icon Network' />
									</a>
								</div>
							</div>
						</div>
					</section>
				</section>
			)}
		</>
	)
}
