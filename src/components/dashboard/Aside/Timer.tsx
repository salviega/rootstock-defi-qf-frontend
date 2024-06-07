import { useEffect, useState } from 'react'

import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'

import Countdown from '../layout/Countdown'

export default function Timer(): JSX.Element {
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
		<>
			{Date.now() > registrationStartTime.getTime() &&
				Date.now() < registrationEndTime.getTime() && (
					<div className='flex flex-col items-left w-fit gap-1 '>
						<h5 className='flex text-left w-fit'>
							<span className='border-b-2 border-secdcolor text-secdcolor text-fontL font-semibold'>
								Registry Time
							</span>
						</h5>
						<Countdown targetDate={registrationEndTime} />
					</div>
				)}
			{Date.now() > registrationEndTime.getTime() &&
				Date.now() < allocationStartTime.getTime() && (
					<div className='flex flex-col items-center gap-1 '>
						<h5 className='flex text-left'>
							<span className='border-b-2 border-secdcolor text-secdcolor text-fontL font-semibold'>
								Voting Starts
							</span>
						</h5>
						<Countdown targetDate={allocationStartTime} />
					</div>
				)}
			{Date.now() > allocationStartTime.getTime() &&
				Date.now() < allocationEndTime.getTime() && (
					<div className='flex flex-col items-center gap-1 '>
						<h5 className='flex text-left'>
							<span className='border-b-2 border-secdcolor text-secdcolor text-fontL font-semibold'>
								Voting Time
							</span>
						</h5>
						<Countdown targetDate={allocationEndTime} />
					</div>
				)}
		</>
	)
}
