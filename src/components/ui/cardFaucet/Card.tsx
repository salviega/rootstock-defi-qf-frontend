import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { ERC20Details } from '@/models/ERC20Details.model'
import { AppDispatch, useAppSelector } from '@/store'
import { approveERC20, mintERC20 } from '@/store/thunks/erc20details.thunk'
import { myContext } from '@/utils/context/context'

import Button from '../Button'

interface Props {
	number: number
}

export default function Card(props: Props) {
	const { setActivePopUp } = useContext(myContext)

	const dispatch = useDispatch<AppDispatch>()

	const erc20Details: ERC20Details = useAppSelector(
		state => state.erc20Details.erc20Details
	)

	const erc20DetailsFetched: boolean = useAppSelector(
		state => state.erc20Details.erc20DetailsFetched
	)

	const onMint = async () => {
		const amount: number = 1000
		dispatch(mintERC20(amount))
	}

	const onApprove = async () => {
		const amount: number = 1000
		dispatch(approveERC20(amount))
	}

	return (
		<>
			{props.number === 1 ? (
				<div className='flex flex-col items-center max-w-[400px] gap-4 my-auto mx-0 px-4 py-6 border-2 border-secdcolor rounded-lg'>
					<h4 className='text-center'>Get Tokens</h4>
					<p className='text-center'>
						This is a test DocMock faucet that will allow you to interact with
						QuadrikChain. By clicking the GET button below you will receive
						1,000 DocMock.
					</p>
					<div className='flex gap-5 mx-auto'>
						<div className='flex gap-1'>
							<span className='text-thircolor font-semibold'>Balance:</span>
							<p>{erc20Details.balance}</p>
						</div>
						<div className='flex gap-1'>
							<span className='text-thircolor font-semibold'>Allowance:</span>
							<p>{erc20Details.allowance}</p>
						</div>
					</div>
					<Button
						color='thircolor'
						// disabled={erc20DetailsFetched}
						sizeFont='L'
						text='Mint'
						hoverBgColor='thircolor'
						hoverTextColor='white'
						onClick={onMint}
					/>
				</div>
			) : props.number === 2 ? (
				<div className='flex flex-col items-center max-w-[400px] gap-4 my-auto mx-0 px-4 py-6 border-2 border-secdcolor rounded-lg'>
					<h4 className='text-center'>Approve Tokens</h4>
					<p className='text-center'>
						By clicking the button below you will approve the Allow contract
						(address above & below) to move test DocMock (the amount you
						specify) from your wallet.
					</p>
					<Button
						color='thircolor'
						sizeFont='L'
						text='Approved'
						hoverBgColor='thircolor'
						hoverTextColor='white'
						onClick={onApprove}
					/>
				</div>
			) : props.number === 3 ? (
				<div className='flex flex-col items-center max-w-[400px] gap-2 my-auto mx-auto px-4 py-6 border-2 border-secdcolor rounded-lg'>
					<h4 className='text-center'>New Round Created</h4>
					<span className='text-thircolor text-fontL font-semibold'>
						Thanks for trust in our platform
					</span>
					<p className='text-center'>
						Go to home, now you can interact with the different projects in our
						platform. Take your time for research and find the perfect project
						for you but don’t forget the time. Recommend this app if you find it
						useful or interest
					</p>
					<div className='flex gap-5 mx-auto mt-4'>
						<button
							className={`w-fit h-fit px-9 py-3 bg-thircolor rounded-lg border`}
						>
							<p
								onClick={() => setActivePopUp(false)}
								className={`text-pricolor text-fontL`}
							>
								Go to Dashboard
							</p>
						</button>
					</div>
				</div>
			) : null}
		</>
	)
}
