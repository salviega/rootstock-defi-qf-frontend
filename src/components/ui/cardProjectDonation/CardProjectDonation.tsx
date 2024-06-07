import { useContext, useState } from 'react'
import { BytesLike, ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { z } from 'zod'

import { getFrontendSigner } from '@/helpers'
import { getContracts } from '@/helpers/contracts'
import { roundsApiFirebase } from '@/middlewares/firebase/round.firebase.middleware'
import { Project } from '@/models/project.model'
import { Round } from '@/models/round.model'
import { AppDispatch } from '@/store'
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
			<div className='flex flex-col w-full mt-4 px-3 gap-5'>
				{isNextBottomDisabled && (
					<form onSubmit={form.handleSubmit(onFundPool)}>
						<input
							className='w-full mb-1 border-b-2 border-secdcolor pb-2'
							type='number'
							placeholder='Amount'
							{...form.register('amount')}
						/>

						<button
							className='w-full h-fit py-3 border rounded-lg bg-thircolor text-pricolor text-fontL'
							type='submit'
						>
							Accept
						</button>
					</form>
				)}
				{!isNextBottomDisabled && (
					<button
						className='w-full h-fit mt-1 py-3 border rounded-lg bg-thircolor text-pricolor text-fontL'
						onClick={() => {
							setActivePopUpVote(false)
							setActiveProgressVote(0)
						}}
					>
						Next
					</button>
				)}
			</div>
		</div>
	)
}
