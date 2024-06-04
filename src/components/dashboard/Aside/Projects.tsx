import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Project } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'
import { myContext } from '@/utils/context/context'

import AddProject from '../../../assets/svg/asideComponent/addIcon.svg'
import IconProject1 from '../../../assets/svg/asideComponent/LogoProject1.svg'
import IconProject2 from '../../../assets/svg/asideComponent/LogoProject2.svg'

export default function Projects(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const [allocationEndTime, setAllocationEndTime] = useState<Date>(new Date())
	const [registrationEndTime, setRegistrationEndTime] = useState<Date>(
		new Date()
	)
	const [registrationStartTime, setRegistrationStartTime] = useState<Date>(
		new Date()
	)

	const lastRound: Round = useAppSelector(state => state.round.lastRound)

	const lastRoundFetched: boolean = useAppSelector(
		state => state.round.lastRoundFetched
	)
	const rounds: Round[] = useAppSelector(state => state.round.rounds)

	const roundsFetched: boolean = useAppSelector(
		state => state.round.roundsFetched
	)

	const projects: Project[] = lastRound.projects

	const getStates = async () => {
		setAllocationEndTime(
			new Date(convertTimestampToDate(lastRound.allocationEndTime))
		)
		setRegistrationEndTime(
			new Date(convertTimestampToDate(lastRound.registrationEndTime))
		)
		setRegistrationStartTime(
			new Date(convertTimestampToDate(lastRound.registrationStartTime))
		)
	}

	useEffect(() => {
		getStates()
	}, [lastRound])

	const activeProject1 =
		activeLayout === 'project1' ? 'bg-extracolor p-3' : 'item-view'
	const activeProject2 =
		activeLayout === 'project2' ? 'bg-extracolor p-3' : 'item-view'
	const activeCreateProject =
		activeLayout === 'create-project' ? 'bg-extracolor p-3' : 'item-view'

	return (
		<section className='flex flex-col items-start gap-3 w-full px-8'>
			<div className='text-start w-full pb-1 border-b-2 border-thircolor'>
				<h4 className='text-thircolor'>Projects</h4>
			</div>
			<nav className='flex flex-col gap-3 w-full'>
				{projects.map((project: Project, index: number) => (
					<NavLink
						to='/dashboard'
						className={`${activeCreateProject} flex items-center w-full gap-3 rounded-lg`}
						key={index}
						onClick={() => {
							setActiveLayout(project.name)
						}}
					>
						<img src={project.logo} alt='Item 1' />
						<span className='text-pricolor text-fontM'>{project.name}</span>
					</NavLink>
				))}
				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('create-project')
					}}
					className={`${activeCreateProject} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={AddProject} alt='Item 3' />
					<span className='text-pricolor text-fontM'>CREATE A NEW PROJECT</span>
				</NavLink>
			</nav>
		</section>
	)
}
