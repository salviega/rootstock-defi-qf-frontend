import { useContext } from 'react'

import 'animate.css';

import Connection from './Aside/Connection'
import Logo from './Aside/Logo'
import Projects from './Aside/Projects'
import Views from './Aside/Views'

import { myContext } from '@/utils/context/context'

export default function Aside(): JSX.Element {
	const { asideActive } = useContext(myContext)

	return (
		<aside className={`${asideActive ? 'aside-container-toggle animate__fadeInLeft' : ''} aside-container animate__animated`} >
			<Logo />
			<Views />
			<Projects />
			<Connection />
		</aside>
	)
}
