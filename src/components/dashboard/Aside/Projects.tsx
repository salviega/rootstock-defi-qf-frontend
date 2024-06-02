/* Hooks */
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

/* Components */
import { myContext } from '@/utils/context/context'

/* Assets */
import IconProject1 from '../../../assets/svg/asideComponent/LogoProject1.svg'
import IconProject2 from '../../../assets/svg/asideComponent/LogoProject2.svg'
import AddProject from '../../../assets/svg/asideComponent/addIcon.svg'

export default function Projects(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const activeProject1 =
		activeLayout === 'project1' ? 'bg-extracolor p-3' : 'item-view'
	const activeProject2 =
		activeLayout === 'project2' ? 'bg-extracolor p-3' : 'item-view'
	const activeCreateProject =
		activeLayout === 'create-project' ? 'bg-extracolor p-3' : 'item-view'

	return (
		<section className='flex flex-col items-start gap-3 w-full px-8'>
			<div className='text-start w-full pb-1 border-b-2 border-thircolor'>
				<h4 className='text-thircolor'>Projects</h4>
			</div>
			<nav className='flex flex-col gap-5 w-full'>
				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('project1')
					}}
					className={`${activeProject1} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={IconProject1} alt='Item 1' />
					<span className='text-pricolor text-fontM'>QUANTUMNET</span>
				</NavLink>

				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('project2')
					}}
					className={`${activeProject2} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={IconProject2} alt='Item 2' />
					<span className='text-pricolor text-fontM'>ECONET DYNAMICS</span>
				</NavLink>

				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('create-project')
					}}
					className={`${activeCreateProject} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={AddProject} alt='Item 3' />
					<span className='text-pricolor text-fontM'>CREATE A NEW PROJECT</span>
				</NavLink>
			</nav>
		</section>
	)
}
