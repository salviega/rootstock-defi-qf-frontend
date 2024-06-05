import { useEffect, useState } from 'react'

import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'

import Timer from './Aside/Timer'

export default function Nav(): JSX.Element {
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
		<nav className='dashboard__container--nav flex items-center justify-between w-full h-[100px] px-10 rounded-lg'>
			<li>
				<Timer />
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						State Round
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<div
						className={`size-2 rounded-full ${
							new Date() > registrationStartTime &&
							new Date() < registrationEndTime
								? 'bg-green-700'
								: 'bg-red-700'
						}`}
					></div>
					{new Date() > registrationStartTime &&
					new Date() < registrationEndTime ? (
						<p className='text-thircolor text-fontM'>Opened</p>
					) : (
						<p className='text-thircolor text-fontM'>Closed</p>
					)}
				</div>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Total In Pool
					</span>
				</div>
				<p className='text-thircolor text-fontM'>
					{`${lastRound.totalPool || 0} Doc`}
				</p>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Matching Pool
					</span>
				</div>
				<p className='text-thircolor text-fontM'>{`${lastRound.machingPool || 0} Doc`}</p>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Total Donations
					</span>
				</div>
				<p className='text-thircolor text-fontM'>{`${lastRound.donations || 0} Doc`}</p>
			</li>
		</nav>
	)
}
