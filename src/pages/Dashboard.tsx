import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

import Aside from '@/components/dashboard/Aside'
import CreateProject from '@/components/dashboard/CreateProject'
import Layout from '@/components/dashboard/Layout'
import Admin from '@/components/dashboard/layout/Admin'
import Faucet from '@/components/dashboard/layout/Faucet'
import Home from '@/components/dashboard/layout/Home'
import Project from '@/components/dashboard/layout/Project'
import Nav from '@/components/dashboard/Nav'
import { Project as ProjectModel } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { AppDispatch, useAppSelector } from '@/store'
import { getERC20Details } from '@/store/thunks/erc20details.thunk'
import { getLastRound, getRounds } from '@/store/thunks/round.thunk'
import { myContext } from '@/utils/context/context'

import arrow from '../assets/svg/asideComponent/Arrow.svg'

export default function Dashboard(): JSX.Element {
	const { activeLayout, setActiveLayout, asideActive, setAsideActive } =
		useContext(myContext)

	const { address } = useAccount()

	const dispatch = useDispatch<AppDispatch>()

	const lastRound: Round = useAppSelector(state => state.round.lastRound)

	const lastRoundFetched: boolean = useAppSelector(
		state => state.round.lastRoundFetched
	)

	const roundsFetched: boolean = useAppSelector(
		state => state.round.roundsFetched
	)

	const projects: ProjectModel[] = lastRound.projects || []

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
	}, [address, lastRoundFetched, roundsFetched, dispatch, setActiveLayout])

	return (
		<main className='main flex gap-5 w-full h-screen p-3'>
			<aside className='aside-arrow'>
				<button onClick={() => setAsideActive(!asideActive)}>
					<img
						className={`${asideActive ? 'rotate-180' : ''}`}
						src={arrow}
						alt=''
					/>
				</button>
			</aside>
			<Aside />
			<section className='container-layout flex flex-col w-full gap-5'>
				<Nav />
				<Layout>
					<>
						{activeLayout === 'home' && <Home />}
						{activeLayout === 'faucet' && <Faucet />}
						{activeLayout === 'dashboard' && <Admin />}
						{activeLayout === 'create a new project' && (
							<CreateProject round={lastRound} />
						)}
						{activeLayout !== 'home' &&
							activeLayout !== 'faucet' &&
							activeLayout !== 'dashboard' &&
							activeLayout !== 'create a new project' &&
							projects?.length > 0 &&
							projects
								.filter(
									(project: ProjectModel) => activeLayout === project.name
								)
								.map((project: ProjectModel, index: number) => (
									<Project key={index} project={project} />
								))}
					</>
				</Layout>
			</section>
		</main>
	)
}
