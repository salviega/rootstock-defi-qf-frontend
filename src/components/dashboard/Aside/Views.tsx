/* Hooks */
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

/* Components */
import { myContext } from '@/utils/context/context'

/* Assets */
import IconItem1 from '../../../assets/svg/asideComponent/item1.svg'
import IconItem2 from '../../../assets/svg/asideComponent/item2.svg'
import IconItem3 from '../../../assets/svg/asideComponent/item3.svg'

export default function Views(): JSX.Element {
	const { activeLayout, setActiveLayout } = useContext(myContext)

	const activeHome = activeLayout === 'home' ? 'bg-extracolor p-3' : 'item-view'
	const activeFaucet =
		activeLayout === 'faucet' ? 'bg-extracolor p-3' : 'item-view'
	const activeDashboard =
		activeLayout === 'dashboard' ? 'bg-extracolor p-3' : 'item-view'

	return (
		<section className='flex flex-col items-start gap-3 w-full px-8'>
			<div className='text-start w-full pb-1 border-b-2 border-thircolor'>
				<h4 className='text-thircolor'>Views</h4>
			</div>
			<nav className='flex flex-col gap-5 w-full'>
				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('home')
					}}
					className={`${activeHome} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={IconItem1} alt='Item 1' />
					<span className='text-pricolor text-fontL'>Home</span>
				</NavLink>

				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('faucet')
					}}
					className={`${activeFaucet} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={IconItem2} alt='Item 2' />
					<span className='text-pricolor text-fontL'>Faucet</span>
				</NavLink>

				<NavLink
					to='/dashboard'
					onClick={() => {
						setActiveLayout('dashboard')
					}}
					className={`${activeDashboard} flex items-center w-full gap-3 rounded-lg`}
				>
					<img src={IconItem3} alt='Item 3' />
					<span className='text-pricolor text-fontL'>Dashboard</span>
				</NavLink>
			</nav>
		</section>
	)
}
