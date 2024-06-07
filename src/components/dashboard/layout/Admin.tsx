import { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

import { QUADRIKCHAIN_ADMIN_ADDRESS } from '@/constants'
import { myContext } from '@/utils/context/context'

import NewRoundForm from '../NewRoundForm'

export default function DashboardAdmin(): JSX.Element {
	const { setActiveLayout } = useContext(myContext)

	const { address } = useAccount()

	useEffect(() => {
		if (!address || address !== QUADRIKCHAIN_ADMIN_ADDRESS) {
			setActiveLayout('home')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<>
			<NewRoundForm />
		</>
	)
}
