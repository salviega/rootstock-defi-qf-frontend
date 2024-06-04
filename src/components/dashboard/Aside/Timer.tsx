import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Project } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'
import { myContext } from '@/utils/context/context'

import AddProject from '../../../assets/svg/asideComponent/addIcon.svg'
import Countdown from '../layout/Countdown'

export default function Timer(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const [allocationEndTime, setAllocationEndTime] = useState<Date>(new Date())
	const [allocationStartTime, setAllocationStartTime] = useState<Date>(
		new Date()
	)
	const [registrationStartTime, setRegistrationStartTime] = useState<Date>(
		new Date()
	)
	const [registrationEndTime, setRegistrationEndTime] = useState<Date>(
		new Date()
	)

	const lastRound: Round = useAppSelector(state => state.round.lastRound)
	const lastRoundFetched: boolean = useAppSelector(
		state => state.round.lastRoundFetched
	)

	const getStates = async () => {
		setAllocationEndTime(
			new Date(convertTimestampToDate(lastRound.allocationEndTime))
		)
		setAllocationStartTime(
			new Date(convertTimestampToDate(lastRound.allocationStartTime))
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastRoundFetched, lastRound])

	return (
		<section className='flex flex-col items-start gap-3 w-full px-8'>
			{Date.now() > registrationStartTime.getTime() &&
			Date.now() < registrationEndTime.getTime() ? (
				<div className='flex items-center justify-between px-2 gap-4'>
					<h5 className='flex flex-col text-left'>
						<span>Registry</span> <span>time</span>
					</h5>
					<Countdown targetDate={registrationEndTime} />
				</div>
			) : Date.now() > registrationEndTime.getTime() &&
			  Date.now() < allocationStartTime.getTime() ? (
				<div className='flex items-center justify-between px-2 gap-4'>
					<h5 className='flex flex-col text-left'>
						<span>Voting</span> <span>starts</span>
					</h5>
					<Countdown targetDate={allocationStartTime} />
				</div>
			) : Date.now() > allocationStartTime.getTime() &&
			  Date.now() < allocationEndTime.getTime() ? (
				<div className='flex items-center justify-between px-2 gap-4'>
					<h5 className='flex flex-col text-left'>
						<span>Voting</span> <span>time</span>
					</h5>
					<Countdown targetDate={allocationEndTime} />
				</div>
			) : null}
		</section>
	)
}
