import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import { QUADRIKCHAIN_ADMIN_ADDRESS } from '@/constants'
import { AppDispatch, useAppSelector } from '@/store'
import { getLastRound } from '@/store/thunks/round.thunk'
import { myContext } from '@/utils/context/context'

import NewRoundForm from '../NewRoundForm'

export default function DashboardAdmin(): JSX.Element {
	const { setActiveLayout } = useContext(myContext)

	const { address } = useAccount()
	const dispatch = useDispatch<AppDispatch>()

	const isLoading: boolean = useAppSelector(state => state.ui.isLoading)
	const lastRoundFetched = useAppSelector(state => state.round.lastRoundFetched)

	useEffect(() => {
		if (!address || address !== QUADRIKCHAIN_ADMIN_ADDRESS) {
			setActiveLayout('home')
			return
		}

		if (!lastRoundFetched) {
			dispatch(getLastRound())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<>
			<NewRoundForm dispatch={dispatch} isLoading={isLoading} />
		</>
	)
}
