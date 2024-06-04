import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import Aside from '@/components/dashboard/Aside'
import CreateProject from '@/components/dashboard/CreateProject'
import Layout from '@/components/dashboard/Layout'
import Admin from '@/components/dashboard/layout/Admin'
import Faucet from '@/components/dashboard/layout/Faucet'
import Project from '@/components/dashboard/layout/Project'
import Nav from '@/components/dashboard/Nav'
import { Round } from '@/models/round.model'
import { AppDispatch, useAppSelector } from '@/store'
import { getERC20Details } from '@/store/thunks/erc20details.thunk'
import { getLastRound, getRounds } from '@/store/thunks/round.thunk'
import { myContext } from '@/utils/context/context'

import Home from '../components/dashboard/layout/Home'

export default function Dashboard(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const { address } = useAccount()

	const dispatch = useDispatch<AppDispatch>()

	const lastRound: Round = useAppSelector(state => state.round.lastRound)

	const lastRoundFetched: boolean = useAppSelector(
		state => state.round.lastRoundFetched
	)

	const roundsFetched: boolean = useAppSelector(
		state => state.round.roundsFetched
	)

	useEffect(() => {
		if (address) {
			dispatch(getERC20Details(address as string))
		} else {
			setActiveLayout('home')
		}

		if (!lastRoundFetched) {
			dispatch(getLastRound())
		}

		if (!roundsFetched) {
			dispatch(getRounds())
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, lastRoundFetched, roundsFetched])

	return (
		<main className='flex gap-5 w-full h-screen p-3'>
			<Aside />
			<section className='flex flex-col w-full gap-5'>
				<Nav />
				<Layout>
					{activeLayout === 'home' ? (
						<Home />
					) : activeLayout === 'faucet' ? (
						<Faucet />
					) : activeLayout === 'dashboard' ? (
						<Admin />
					) : activeLayout === 'create a new project' ? (
						<CreateProject round={lastRound} />
					) : (
						<Home />
					)}
				</Layout>
			</section>
		</main>
	)
}
