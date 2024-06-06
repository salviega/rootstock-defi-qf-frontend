import Connection from './Aside/Connection'
import Logo from './Aside/Logo'
import Projects from './Aside/Projects'
import Views from './Aside/Views'

export default function Aside(): JSX.Element {
	return (
		<aside className='aside__container flex flex-col items-center justify-between w-[32%] h-full gap-4 bg-secdcolor py-4 px-3  rounded-lg'>
			<Logo />
			<Views />
			<Projects />
			<Connection />
		</aside>
	)
}
