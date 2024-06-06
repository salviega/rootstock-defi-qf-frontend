import { Link } from 'react-router-dom'

import LogoSVG from '../../../assets/svg/asideComponent/Logo.svg'

export default function Logo(): JSX.Element {
	return (
		<Link to='/' className='w-full flex items-center gap-2'>
			<img className='w-20' src={LogoSVG} alt='Logo de QuadrikChain' />
			<h4 className='text-pricolor'>
				Quadrik
				<span className='text-thircolor font-title font-semibold'>Chain</span>
			</h4>
		</Link>
	)
}
