import { useContext, useState } from 'react'
import { BytesLike, ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { z } from 'zod'

import { ALLO_CONTRACT_ADDRESS } from '@/constants'
import { getFrontendSigner } from '@/helpers'
import { getContracts } from '@/helpers/contracts'
import { roundsApiFirebase } from '@/middlewares/firebase/round.firebase.middleware'
import { Project } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { AppDispatch, useAppSelector } from '@/store'
import { setRound } from '@/store/slides/roundslice'
import { setIsLoading } from '@/store/slides/uiSlice'
import { toAbiCoder, toDecimal } from '@/utils'
import { myContext } from '@/utils/context/context'
import {
	ALLOCATE_STRUCT_TYPES,
	ERROR_MESSAGE,
	GAS_LIMIT
} from '@/utils/variables/constants'
import { donateFormSchema } from '@/utils/variables/constants/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'

const abi = ['function allocate( uint256 _poolId, bytes memory _data )']

const iface = new ethers.Interface(abi)

type Props = {
	project: Project
	round: Round
}

export default function CardProjectDonation(props: Props): JSX.Element {
	const { setActiveProgressVote, setActivePopUpVote } = useContext(myContext)

	const { project, round } = props

	const { address } = useAccount()

	const [isNextBottomDisabled, setIsNextBottomDisabled] =
		useState<boolean>(true)

	const dispatch = useDispatch<AppDispatch>()

	const isLoading: boolean = useAppSelector(state => state.ui.isLoading)

	const { allo } = getContracts()
	const { updateRound } = roundsApiFirebase()

	const form = useForm<z.infer<typeof donateFormSchema>>({
		defaultValues: {
			amount: ''
		},
		resolver: zodResolver(donateFormSchema)
	})

	const onFundPool = async (values: z.infer<typeof donateFormSchema>) => {
		try {
			if (!address) return

			dispatch(setIsLoading(true))
			const web3Signer: ethers.JsonRpcSigner = await getFrontendSigner()

			const amount: number = Number(values.amount)
			const donation: bigint = toDecimal(amount)

			const fundPoolTx = await allo
				.connect(web3Signer)
				.fundPool(round.poolId, donation, { gasLimit: GAS_LIMIT })
			await fundPoolTx.wait()

			const voiceCredits: number = amount

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const allocateDataArray: any[] = [project.recipientId, voiceCredits]

			const allocateDataBytes: BytesLike = toAbiCoder(
				ALLOCATE_STRUCT_TYPES,
				allocateDataArray
			)

			const allocateFundsTx = await allo
				.connect(web3Signer)
				.allocate(round.poolId, allocateDataBytes, { gasLimit: GAS_LIMIT })
			await allocateFundsTx.wait()

			const updatedRound = {
				...round,
				donations: round.donations + amount,
				totalPool: round.totalPool + amount,
				donators: [...round.donators]
			}

			updatedRound.donations = updatedRound.donations + amount
			updatedRound.totalPool = updatedRound.totalPool + amount

			const isDonator: boolean = updatedRound.donators.some(
				donator => donator === address
			)

			if (!isDonator) {
				console.log('updatedRound.donators', updatedRound.donators)
				updatedRound.donators.push(address)
			}

			console.log('Successfully donated!')
			setIsNextBottomDisabled(false)
			await updateRound(updatedRound)
			dispatch(setRound(updatedRound))
			dispatch(setIsLoading(false))
			toast.success('Thank you for your donation!')
		} catch (error) {
			console.error(error)
			dispatch(setIsLoading(false))
			toast.error(ERROR_MESSAGE)
		}
	}

	return (
		<div className='flex flex-col items-center max-w-[450px] gap-2 my-auto mx-auto px-4 py-6 border-2 border-secdcolor rounded-lg'>
			<h4 className='text-center'>How Much Will You Donate?</h4>
			<span className='text-thircolor text-center text-fontM font-semibold'>
				The donation is not obligatory, you can skip this step clicking the
				button continue
			</span>
			<p className='text-center'>
				Give your support to this project with any quantity, the limit is yours.
				Every single help and support you will give to the project is a step for
				the advance of web3 and all the team involved in the develop and
				creation of this project.
			</p>
			<div className='flex flex-col w-full gap-5 mt-4 px-3'>
				<form onSubmit={form.handleSubmit(onFundPool)}>
					<div>
						<input
							className='w-full border-b-2 border-secdcolor pb-2'
							type='number'
							placeholder='Amount'
							{...form.register('amount')}
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<button
							type='submit'
							className='w-full h-fit px-9 py-3 bg-thircolor rounded-lg border'
						>
							<p className='text-pricolor text-fontL'>Accept</p>
						</button>
					</div>
				</form>
				{!isNextBottomDisabled && (
					<button
						onClick={() => {
							setActivePopUpVote(false)
							setActiveProgressVote(0)
						}}
						className='w-full h-fit px-9 py-3 bg-pricolor rounded-lg border-2 border-thircolor'
					>
						<p className='text-thircolor text-fontL'>Next</p>
					</button>
				)}
			</div>
		</div>
	)
}
