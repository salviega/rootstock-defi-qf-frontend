import { useContext, useState } from 'react'
import { AddressLike, BytesLike, ethers, MaxUint256 } from 'ethers'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { ALLO_PROFILE_ID, ROUND_ADDRESS } from '@/constants'
import { getFrontendSigner } from '@/helpers'
import { getContracts } from '@/helpers/contracts'
import { storeFile, storeObject } from '@/helpers/pinata'
import { roundsApiFirebase } from '@/middlewares/firebase/round.firebase.middleware'
import { AppThunkDispatch } from '@/models/dispatch.model'
import { InitializeData } from '@/models/initialize-data.model'
import { Metadata } from '@/models/metadata.model'
import { Round, RoundMetadata } from '@/models/round.model'
import { setRound, setRoundFetched } from '@/store/slides/roundslice'
import { setIsLoading } from '@/store/slides/uiSlice'
import { toAbiCoder, toDecimal, toTimestamp } from '@/utils'
import { myContext } from '@/utils/context/context'
import {
	ERROR_MESSAGE,
	GAS_LIMIT,
	INITIALIZE_DATA_STRUCT_TYPES
} from '@/utils/variables/constants'
import { createRoundFormSchema } from '@/utils/variables/constants/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
	dispatch: AppThunkDispatch
	isLoading: boolean
}

export default function NewRoundForm(props: Props): JSX.Element {
	const { activePopUp, setActivePopUp } = useContext(myContext)

	const { dispatch, isLoading } = props

	const [banner, setBanner] = useState<File | null>(null)

	const { allo, doCMock, qVSimpleStrategy } = getContracts()
	const { addRound, getRoundsLength } = roundsApiFirebase()

	const form = useForm<z.infer<typeof createRoundFormSchema>>({
		defaultValues: {
			name: '',
			amount: '',
			registrationBegin: '',
			registrationDeadline: '',
			allocationBegin: '',
			allocationDeadline: ''
		},
		resolver: zodResolver(createRoundFormSchema)
	})

	const onCreatePoolWithCustomStrategy = async (
		values: z.infer<typeof createRoundFormSchema>
	) => {
		try {
			dispatch(setIsLoading(true))
			dispatch(setRoundFetched(false))
			const web3Signer: ethers.JsonRpcSigner = await getFrontendSigner()

			const profileId: BytesLike = ALLO_PROFILE_ID
			const roundAddress: AddressLike = ROUND_ADDRESS

			const registrationStartTime: number = toTimestamp(
				values.registrationBegin
			)
			const registrationEndTime: number = toTimestamp(
				values.registrationDeadline
			)
			const allocationStartTime: number = toTimestamp(values.allocationBegin)
			const allocationEndTime: number = toTimestamp(values.allocationDeadline)

			const nowTime: Date = new Date()

			const reviewThreshold: number = toTimestamp(
				addMinutesToDate(nowTime, 0).toISOString()
			)

			const roundInitStrategyDataObject: InitializeData = {
				registryGating: false,
				metadataRequired: true,
				reviewThreshold,
				registrationStartTime,
				registrationEndTime,
				allocationStartTime,
				allocationEndTime
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const roundInitStrategyDataArray: any[] = [
				MaxUint256,
				[
					roundInitStrategyDataObject.registryGating,
					roundInitStrategyDataObject.metadataRequired,
					roundInitStrategyDataObject.reviewThreshold,
					roundInitStrategyDataObject.registrationStartTime,
					roundInitStrategyDataObject.registrationEndTime,
					roundInitStrategyDataObject.allocationStartTime,
					roundInitStrategyDataObject.allocationEndTime
				]
			]

			const initRoundData: BytesLike = toAbiCoder(
				INITIALIZE_DATA_STRUCT_TYPES,
				roundInitStrategyDataArray
			)

			const daiMockContractAddress: AddressLike = await doCMock.getAddress()

			let poolFundingAmount: bigint | number | string = values.amount
			poolFundingAmount = Number(poolFundingAmount)
			poolFundingAmount = toDecimal(poolFundingAmount)

			const bannerHash: string = await storeFile(banner as File)

			const roundMetadata: RoundMetadata = {
				name: values.name,
				banner: bannerHash
			}

			const ipfsUrl: string = await storeObject(roundMetadata)

			const metadata: Metadata = {
				protocol: BigInt(1),
				pointer: ipfsUrl
			}

			const poolManagersAddresses: AddressLike[] = []

			console.log('profileId', profileId)
			console.log('roundAddress', roundAddress)
			console.log('initRoundData', initRoundData)
			console.log('daiMockContractAddress', daiMockContractAddress)
			console.log('poolFundingAmount', poolFundingAmount)
			console.log('metadata', metadata)
			console.log('poolManagersAddresses', poolManagersAddresses)

			const createPoolWithCustomStrategyTx = await allo
				.connect(web3Signer)
				.createPoolWithCustomStrategy(
					profileId,
					roundAddress,
					initRoundData,
					daiMockContractAddress,
					poolFundingAmount,
					metadata,
					poolManagersAddresses,
					{
						gasLimit: GAS_LIMIT
					}
				)
			await createPoolWithCustomStrategyTx.wait()

			const currentQvSimpleStrategyContract =
				qVSimpleStrategy(ROUND_ADDRESS).connect(web3Signer)

			const poolId: bigint = await currentQvSimpleStrategyContract.getPoolId()
			const poolIdNumber: number = Number(poolId)

			const roundsLegth: number = await getRoundsLength()
			const id: number = roundsLegth + 1

			const round: Round = {
				address: ROUND_ADDRESS,
				allocationEndTime: roundInitStrategyDataObject.allocationEndTime,
				allocationStartTime: roundInitStrategyDataObject.allocationStartTime,
				distributed: false,
				donations: 0,
				donators: [],
				id,
				image: bannerHash,
				machingPool: Number(values.amount),
				metadataRequired: roundInitStrategyDataObject.metadataRequired,
				name: roundMetadata.name,
				poolId: poolIdNumber,
				profileId,
				projects: [],
				registrationEndTime: roundInitStrategyDataObject.registrationEndTime,
				registrationStartTime:
					roundInitStrategyDataObject.registrationStartTime,
				registryGating: roundInitStrategyDataObject.registryGating,
				reviewThreshold: roundInitStrategyDataObject.reviewThreshold,
				totalPool: Number(values.amount)
			}

			await addRound(round)
			dispatch(setRound(round))
			dispatch(setRoundFetched(true))
			dispatch(setIsLoading(false))
			toast.success('Round created successfully!')
			form.reset()
		} catch (error) {
			console.error(error)
			dispatch(setRoundFetched(true))
			dispatch(setIsLoading(false))
			toast.error(ERROR_MESSAGE)
		}
	}

	return (
		<section className={`${activePopUp ? 'hidden' : 'flex flex-col gap-5'}`}>
			<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
				<h2 className='text-secdcolor'>Dashboard</h2>
			</div>
			<form
				className='flex flex-col w-[550px] gap-5 mx-auto mt-5'
				onSubmit={form.handleSubmit(onCreatePoolWithCustomStrategy)}
			>
				<section className='w-full flex items-center justify-between'>
					<h3 className='text-center pr-8'>New Round</h3>
					{/* <button
						type='button'
						onClick={() => setActivePopUp(true)}
						className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
					>
						<p className='text-pricolor'>Create Round</p>
					</button> */}
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
							disabled
							placeholder='Test'
							type='text'
							value={`${ALLO_PROFILE_ID.slice(0, 33)}...`}
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
						/>
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='name'
							className='text-thircolor text-fontL font-semibold'
						>
							Round Name
						</label>
						<input
							type='text'
							id='name'
							placeholder='Transforming the Web3'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...form.register('name')}
						/>
						{form.formState.errors.name && (
							<p className='text-red-500'>
								{form.formState.errors.name.message}
							</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='banner'
							className='block text-fontL font-semibold text-thircolor'
						>
							Banner
						</label>
						<input
							type='file'
							accept='image/png, image/jpeg'
							id='banner'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontS border-secdcolor'
							onChange={event => {
								setBanner(event.target.files?.[0] || null)
							}}
						/>
						{/* {form.formState.errors.banner && (
							<p className='text-red-500'>
								{form.formState.errors.banner.message}
							</p>
						)} */}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='amount'
							className='block text-fontL font-semibold text-thircolor'
						>
							Founding Amount
						</label>
						<input
							type='number'
							id='amount'
							placeholder='10,000 DAI'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							{...form.register('amount')}
						/>
						{form.formState.errors.amount && (
							<p className='text-red-500'>
								{form.formState.errors.amount.message}
							</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='registrationBegin'
							className='block text-fontL font-semibold text-thircolor'
						>
							Registration Beginning
						</label>
						<input
							type='datetime-local'
							id='registrationBegin'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							{...form.register('registrationBegin')}
						/>
						{form.formState.errors.registrationBegin && (
							<p className='text-red-500'>
								{form.formState.errors.registrationBegin.message}
							</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='registrationDeadline'
							className='block text-fontL font-semibold text-thircolor'
						>
							Registration Deadline
						</label>
						<input
							type='datetime-local'
							id='registrationDeadline'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							{...form.register('registrationDeadline')}
						/>
						{form.formState.errors.registrationDeadline && (
							<p className='text-red-500'>
								{form.formState.errors.registrationDeadline.message}
							</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='allocationBegin'
							className='block text-fontL font-semibold text-thircolor'
						>
							Allocation Beginning
						</label>
						<input
							type='datetime-local'
							id='allocationBegin'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							{...form.register('allocationBegin')}
						/>
						{form.formState.errors.allocationBegin && (
							<p className='text-red-500'>
								{form.formState.errors.allocationBegin.message}
							</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='allocationDeadline'
							className='block text-fontL font-semibold text-thircolor'
						>
							Allocation Deadline
						</label>
						<input
							type='datetime-local'
							id='allocationDeadline'
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontM border-secdcolor'
							{...form.register('allocationDeadline')}
						/>
						{form.formState.errors.allocationDeadline && (
							<p className='text-red-500'>
								{form.formState.errors.allocationDeadline.message}
							</p>
						)}
					</div>
				</section>
				<button
					type='submit'
					className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}
				>
					<p className='text-pricolor'>Submit</p>
				</button>
			</form>
		</section>
	)
}

function addMinutesToDate(date: Date, minutes: number): Date {
	return new Date(date.getTime() + minutes * 60000)
}
