import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { QUADRIKCHAIN_ADMIN_ADDRESS } from '@/constants'
import { Round } from '@/models/round.model'
import { useAppSelector } from '@/store'
import { convertTimestampToDate } from '@/utils'
import { myContext } from '@/utils/context/context'

import NewRoundForm from '../NewRoundForm'

export default function DashboardAdmin(): JSX.Element {
	const { setActiveLayout } = useContext(myContext)

	const { address } = useAccount()

	const [allocationEndTime, setAllocationEndTime] = useState<Date>(new Date())

	const lastRound: Round = useAppSelector(state => state.round.lastRound)

	useEffect(() => {
		if (!address || address !== QUADRIKCHAIN_ADMIN_ADDRESS) {
			setActiveLayout('home')
		}

		setAllocationEndTime(
			new Date(convertTimestampToDate(lastRound.allocationEndTime))
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<>
			<NewRoundForm
				allocationEndTime={allocationEndTime}
				lastRound={lastRound}
			/>
		</>
	)
}
