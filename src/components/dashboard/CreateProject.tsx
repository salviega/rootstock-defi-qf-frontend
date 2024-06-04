import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import { QUADRIKCHAIN_ADMIN_ADDRESS } from '@/constants'
import { Round } from '@/models/round.model'
import { AppDispatch, useAppSelector } from '@/store'
import { myContext } from '@/utils/context/context'

import NewProjectForm from './NewProjectForm'

type Props = {
	round: Round
}

export default function CreateProject(props: Props): JSX.Element {
	const { round } = props

	const { activeLayout, setActiveLayout } = useContext(myContext)

	const { address } = useAccount()
	const dispatch = useDispatch<AppDispatch>()

	const isLoading: boolean = useAppSelector(state => state.ui.isLoading)

	useEffect(() => {
		if (
			!address ||
			address === QUADRIKCHAIN_ADMIN_ADDRESS ||
			!round ||
			round?.projects?.some(project => project.recipientId === address)
		) {
			setActiveLayout('home')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<>
			<NewProjectForm dispatch={dispatch} isLoading={isLoading} />
		</>
	)
}
