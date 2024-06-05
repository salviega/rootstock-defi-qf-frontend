import { useContext, useRef, useState } from 'react'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'

import { AppThunkDispatch } from '@/models/dispatch.model'
import { ProjectDto } from '@/models/project.model'
import { createProject } from '@/store/thunks/project.thunk'
import { myContext } from '@/utils/context/context'

type Props = {
	dispatch: AppThunkDispatch
	isLoading: boolean
}

type FormData = {
	name: string
	slogan: string
	description: string
	tags: string
	media: [github: string, website: string, twitter: string]
}

export default function NewProjectForm(props: Props): JSX.Element {
	const { dispatch, isLoading } = props

	const { activeLayout, setActiveLayout } = useContext(myContext)
	const { address } = useAccount()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>()

	const bannerRef = useRef<HTMLInputElement | null>(null)
	const logoRef = useRef<HTMLInputElement | null>(null)

	const onCreateProject = async (values: FormData) => {
		if (!address) return

		const banner = bannerRef.current?.files?.[0] || null
		const logo = logoRef.current?.files?.[0] || null

		const projectDto: ProjectDto = {
			amountDistributed: 0,
			banner: banner as File,
			description: values.description,
			logo: logo as File,
			name: values.name,
			recipientId: address as string,
			slogan: values.slogan,
			tags: values.tags.split(',').map(tag => tag.trim()),
			media: values.media.map(net => net.trim())
		}

		dispatch(
			createProject({ address: address as string, setActiveLayout, projectDto })
		)
	}

	return (
		<section className={`flex flex-col gap-5`}>
			<div className='flex flex-row-reverse w-full justify-between pb-3 border-b-4 border-secdcolor border-dashed'>
				<h2 className='text-secdcolor'>Dashboard</h2>
			</div>
			<form
				className='flex flex-col w-[550px] gap-5 mx-auto mt-5'
				onSubmit={handleSubmit(onCreateProject)}
			>
				<section className='w-full flex items-center justify-between'>
					<h3 className='text-center pr-8'>New Project</h3>
				</section>
				<section className='flex justify-center flex-wrap gap-x-6 gap-y-4'>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='name'
							className='text-thircolor text-fontL font-semibold'
						>
							Project Name
						</label>
						<input
							type='text'
							id='name'
							placeholder='Transforming the Web3'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('name', { required: 'Name is required' })}
						/>
						{errors.name && (
							<p className='text-red-500'>{errors.name.message}</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='slogan'
							className='text-thircolor text-fontL font-semibold'
						>
							Slogan
						</label>
						<input
							type='text'
							id='slogan'
							placeholder='Promoting open science'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('slogan', { required: 'Slogan is required' })}
						/>
						{errors.slogan && (
							<p className='text-red-500'>{errors.slogan.message}</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='description'
							className='text-thircolor text-fontL font-semibold'
						>
							Description
						</label>
						<input
							type='text'
							id='description'
							placeholder='This project is focused on...'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('description', {
								required: 'Description is required'
							})}
						/>
						{errors.description && (
							<p className='text-red-500'>{errors.description?.message}</p>
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
							ref={bannerRef}
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontS border-secdcolor'
						/>
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='logo'
							className='block text-fontL font-semibold text-thircolor'
						>
							Logo
						</label>
						<input
							type='file'
							accept='image/png, image/jpeg'
							id='logo'
							ref={logoRef}
							className='w-full border-b-2 py-2 pl-2 pr-auto text-secdcolor text-fontS border-secdcolor'
						/>
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='twitter'
							className='text-thircolor text-fontL font-semibold'
						>
							Twitter (without @)
						</label>
						<input
							type='text'
							id='twitter'
							placeholder='myproject'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('media.2', { required: 'Twitter is required' })}
						/>
						{errors.media?.[2] && (
							<p className='text-red-500'>{errors.media?.[2]?.message}</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='github'
							className='text-thircolor text-fontL font-semibold'
						>
							Github url
						</label>
						<input
							type='text'
							id='github'
							placeholder='https://github.com/myproject'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('media.0', {
								required: 'Github URL is required',
								pattern: {
									value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
									message: 'Invalid URL'
								}
							})}
						/>
						{errors.media?.[0] && (
							<p className='text-red-500'>{errors.media?.[0]?.message}</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='website'
							className='text-thircolor text-fontL font-semibold'
						>
							Website/Linktree
						</label>
						<input
							type='text'
							id='website'
							placeholder='https://myproject.com'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('media.1', {
								required: 'Website is required',
								pattern: {
									value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
									message: 'Invalid URL'
								}
							})}
						/>
						{errors.media?.[1] && (
							<p className='text-red-500'>{errors.media?.[1]?.message}</p>
						)}
					</div>
					<div className='flex flex-col w-[250px]'>
						<label
							htmlFor='tags'
							className='text-thircolor text-fontL font-semibold'
						>
							Tags
						</label>
						<input
							type='text'
							id='tags'
							placeholder='tech, biology, etc.'
							className='w-full px-5 py-2 text-fontM border-secdcolor border-b-2'
							{...register('tags', { required: 'Tags are required' })}
						/>
						{errors.tags && (
							<p className='text-red-500'>{errors.tags.message}</p>
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
