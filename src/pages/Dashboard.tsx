import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import Aside from '@/components/dashboard/Aside'
import Layout from '@/components/dashboard/Layout'
import Admin from '@/components/dashboard/layout/Admin'
import Faucet from '@/components/dashboard/layout/Faucet'
import Project from '@/components/dashboard/layout/Project'
import Nav from '@/components/dashboard/Nav'
import { AppDispatch, useAppSelector } from '@/store'
import { getERC20Details } from '@/store/thunks/erc20details.thunk'
import { getLastRound } from '@/store/thunks/round.thunk'
import { myContext } from '@/utils/context/context'
import Projects from '@/utils/projects/Projects.ts'

import Home from '../components/dashboard/layout/Home'

export default function Dashboard(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const { address } = useAccount()

	const dispatch = useDispatch<AppDispatch>()

	const lastRoundFetched = useAppSelector(state => state.round.lastRoundFetched)

	useEffect(() => {
		if (address) {
			dispatch(getERC20Details(address as string))
		} else {
			setActiveLayout('home')
		}

		if (!lastRoundFetched) {
			dispatch(getLastRound())
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

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
					) : activeLayout === 'project1' ? (
						<Project item={Projects[0]} />
					) : activeLayout === 'project2' ? (
						<Project item={Projects[1]} />
					) : (
						<Home />
					)}
				</Layout>
			</section>
		</main>
	)
}
