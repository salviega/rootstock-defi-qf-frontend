import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'

import Loading from '@/components/ui/loading'
import { QUADRIKCHAIN_ADMIN_ADDRESS } from '@/constants'
import { Project as ProjectModel } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'
import { myContext } from '@/utils/context/context'

import AddProject from '../../../assets/svg/asideComponent/addIcon.svg'

export default function Projects(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const { address } = useAccount()

	const [registrationEndTime, setRegistrationEndTime] = useState<Date>(
		new Date()
	)
	const [registrationStartTime, setRegistrationStartTime] = useState<Date>(
		new Date()
	)

	const lastRoundFetched: boolean = useAppSelector(
		state => state.round.lastRoundFetched
	)

	const lastRound: Round = useAppSelector(state => state.round.lastRound)

	const projects: ProjectModel[] = lastRound.projects

	const getStates = async () => {
		setRegistrationEndTime(
			new Date(convertTimestampToDate(lastRound.registrationEndTime))
		)
		setRegistrationStartTime(
			new Date(convertTimestampToDate(lastRound.registrationStartTime))
		)
	}

	useEffect(() => {
		getStates()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastRound])

	const activeCreateProject =
		activeLayout === 'create-project' ? 'bg-extracolor p-3' : 'item-view'

	return (
		<section className='flex flex-col items-start gap-3 w-full h-fit'>
			<div className='text-start w-full pb-1 border-b-2 border-thircolor'>
				<h4 className='text-thircolor'>Projects</h4>
			</div>

			<nav className='nav-project-aside flex flex-col gap-3 w-full h-[160px]'>
				{!lastRoundFetched ? (
					<Loading textColor='pricolor' textSize='fontL' />
				) : (
					projects?.map((project: ProjectModel, index: number) => (
						<NavLink
							to='/dashboard'
							className={`${activeCreateProject} flex items-center w-full gap-3 rounded-lg`}
							key={index}
							onClick={() => {
								setActiveLayout(project.name)
							}}
						>
							<img
								className='w-[100px] h-[70px] rounded-xl'
								src={project.logo}
								alt='Item 1'
							/>
							<span className='text-pricolor text-fontM uppercase'>
								{project.name}
							</span>
						</NavLink>
					))
				)}
				<>
					{address &&
						!lastRound.projects?.some(
							projects => projects.recipientId === address
						) &&
						new Date() > registrationStartTime &&
						new Date() < registrationEndTime &&
						address !== QUADRIKCHAIN_ADMIN_ADDRESS && (
							<NavLink
								to='/dashboard'
								onClick={() => {
									setActiveLayout('create a new project')
								}}
								className={`${activeCreateProject} flex items-center w-full gap-3 rounded-lg`}
							>
								<img src={AddProject} alt='Item 3' />
								<span className='text-pricolor text-fontM'>
									CREATE A NEW PROJECT
								</span>
							</NavLink>
						)}
				</>
			</nav>
		</section>
	)
}
