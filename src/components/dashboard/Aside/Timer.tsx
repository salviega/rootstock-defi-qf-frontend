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
		<section className='flex items-start gap-3 w-full'>
			{Date.now() > registrationStartTime.getTime() &&
			Date.now() < registrationEndTime.getTime() ? (
				<div className='flex items-center justify-between gap-4'>
					<h5 className='flex text-left'>
						<span className='item-actual-time'>Registry Time</span>
					</h5>
					<Countdown targetDate={registrationEndTime} />
				</div>
			) : Date.now() > registrationEndTime.getTime() &&
			  Date.now() < allocationStartTime.getTime() ? (
				<div className='flex items-center justify-between px-2 gap-4'>
					<h5 className='flex flex-col text-left'>
						<span className='item-actual-time'>Voting Starts</span>
					</h5>
					<Countdown targetDate={allocationStartTime} />
				</div>
			) : Date.now() > allocationStartTime.getTime() &&
			  Date.now() < allocationEndTime.getTime() ? (
				<div className='flex flex-col items-center justify-between'>
					<h5 className='flex flex-col text-left border-b-2 border-secdcolor pr-5'>
						<span className='item-actual-time'>Voting Time</span>
					</h5>
					<Countdown targetDate={allocationEndTime} />
				</div>
			) : null}
		</section>
	)
}
