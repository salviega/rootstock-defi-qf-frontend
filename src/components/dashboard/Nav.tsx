import { useEffect, useState } from 'react'

import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'

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
		<nav className='dashboard__container--nav flex items-center justify-evenly w-full h-[100px] px-10 rounded-lg'>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						State Round
					</span>
				</div>
				<p className='text-thircolor text-fontM'>Completed</p>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Total In Pool
					</span>
				</div>
				<p className='text-thircolor text-fontM'>2.800 DAI</p>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Matching Pool
					</span>
				</div>
				<p className='text-thircolor text-fontM'>1000 DAI</p>
			</li>
			<li>
				<div className='w-fit pr-5 border-b-2 border-secdcolor'>
					<span className='text-secdcolor text-fontL font-semibold'>
						Total Donations
					</span>
				</div>
				<p className='text-thircolor text-fontM'>1</p>
			</li>
		</nav>
	)
}
