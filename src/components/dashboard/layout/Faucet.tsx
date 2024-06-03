import { useContext } from 'react'

import Card from '@/components/ui/cardFaucet/Card'
import ToggleFaucet from '@/components/ui/toggleFaucet/ToggleFaucet'
import { myContext } from '@/utils/context/context'

export default function Faucet(): JSX.Element {
	const { isClicked } = useContext(myContext)

	return (
		<section className='flex flex-col gap-5'>
			<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
				<h2 className='text-secdcolor'>Faucet</h2>
			</div>
			<section className='flex flex-col items-center w-full h-fit gap-5 mt-16'>
				<ToggleFaucet />
				{isClicked === 0 ? <Card number={1} /> : <Card number={2} />}
			</section>
		</section>
	)
}
