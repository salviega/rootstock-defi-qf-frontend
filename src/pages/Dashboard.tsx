/* Hooks */
import { useContext } from 'react'

/* Dashboard Components */
import Aside from '@/components/dashboard/Aside'
import Nav from '@/components/dashboard/Nav'
import Layout from '@/components/dashboard/Layout'

/* Context */
import { myContext } from '@/utils/context/context'

/* Layout Components */
import Home from '../components/dashboard/layout/Home'
import Admin from '@/components/dashboard/layout/Admin'
import Faucet from '@/components/dashboard/layout/Faucet'
import Project from '@/components/dashboard/layout/Project'

import Projects from '@/utils/projects/Projects.ts'

export default function Dashboard(): JSX.Element {
	const { activeLayout } = useContext(myContext)

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
