import { useContext } from 'react'

import Card from '@/components/ui/cardFaucet/Card'
import { myContext } from '@/utils/context/context'

export default function DashboardAdmin(): JSX.Element {
	const { activePopUp, setActivePopUp } = useContext(myContext)

	return (
		<>
			<section className={`${activePopUp ? 'hidden' : 'flex flex-col gap-5'}`}>
				<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
					<h2 className='text-secdcolor'>Dashboard</h2>
				</div>
				<form className='flex flex-col w-[550px] gap-5 mx-auto mt-5'>
					<section className='w-full flex items-center justify-between'>
						<h3 className='text-center pr-8'>New Round</h3>
						<button
							type='button'
							onClick={() => setActivePopUp(true)}
							className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
						>
							<p className='text-pricolor'>Create Round</p>
						</button>
					</section>
					<section className='flex justify-center flex-wrap gap-x-6 gap-y-4'>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='id'
								className='text-thircolor text-fontL font-semibold'
							>
								Profile ID
							</label>
							<input
								type='text'
								name='id'
								required
								id='id'
								placeholder='Number Wallet'
								className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='round'
								className='text-thircolor text-fontL font-semibold'
							>
								Round Name
							</label>
							<input
								type='text'
								name='round'
								required
								id='round'
								placeholder='Transforming the Web3'
								className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='img'
								className='block text-fontL font-semibold text-thircolor'
							>
								Banner
							</label>
							<input
								type='file'
								name='img'
								id='img'
								required
								accept='image/png, image/jpeg'
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontS border-secdcolor'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='ammount'
								className='block text-fontL font-semibold text-thircolor'
							>
								Founding Amount
							</label>
							<input
								type='number'
								name='ammount'
								id='ammount'
								required
								placeholder='10,000 DAI'
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='R-Begging'
								className='block text-fontL font-semibold text-thircolor'
							>
								Registration Beginning
							</label>
							<input
								type='datetime-local'
								name='R-Begging'
								id='R-Begging'
								required
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='R-End'
								className='block text-fontL font-semibold text-thircolor'
							>
								Registration Deadline
							</label>
							<input
								type='datetime-local'
								name='R-Begging'
								id='R-Begging'
								required
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='A-Begging'
								className='block text-fontL font-semibold text-thircolor'
							>
								Allocation Beginning
							</label>
							<input
								type='datetime-local'
								name='A-Begging'
								id='A-Begging'
								required
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							/>
						</div>
						<div className='flex flex-col w-[250px]'>
							<label
								htmlFor='A-End'
								className='block text-fontL font-semibold text-thircolor'
							>
								Allocation Deadline
							</label>
							<input
								type='datetime-local'
								name='A-End'
								id='A-End'
								required
								className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							/>
						</div>
					</section>
				</form>
			</section>
			{activePopUp && (
				<section className='w-full h-full pt-28'>
					<Card number={3} />
				</section>
			)}
		</>
	)
}
