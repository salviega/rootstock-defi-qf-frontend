import { useContext } from 'react'

import { myContext } from '@/utils/context/context'

import Connection from './Aside/Connection'
import Logo from './Aside/Logo'
import Projects from './Aside/Projects'
import Views from './Aside/Views'

import 'animate.css'

export default function Aside(): JSX.Element {
	const { asideActive } = useContext(myContext)

	return (
		<aside
			className={`${asideActive ? 'aside-container-toggle animate__fadeInLeft' : ''} aside-container animate__animated`}
		>
			<Logo />
			<Views />
			<Projects />
			<Connection />
		</aside>
	)
}
