/* Hooks */
import { useContext } from 'react'

/* Components */
import Card from '@/components/ui/cardFaucet/Card'
import ToggleFaucet from '@/components/ui/toggleFaucet/ToggleFaucet'
/* Context */
import { myContext } from '@/utils/context/context'

export default function Faucet(): JSX.Element {
	const { isClicked } = useContext(myContext)

	return (
		<section className='flex flex-col gap-5'>
			<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
				<h2 className='text-secdcolor'>Faucet</h2>
				<div className='flex flex-col  gap-1'>
					<div className=' w-fit border-b-2 border-thircolor pr-5'>
						<span className='text-thircolor text-fontL'>Address Wallet</span>
					</div>
					<p className='text-secdcolor'>The wallet hasn't been connected</p>
				</div>
			</div>
			<section className='flex flex-col items-center w-full h-fit gap-5 mt-16'>
				<ToggleFaucet />
				{isClicked === 0 ? <Card number={1} /> : <Card number={2} />}
			</section>
		</section>
	)
}
