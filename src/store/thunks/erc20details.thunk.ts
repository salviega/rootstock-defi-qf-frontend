import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { ALLO_CONTRACT_ADDRESS } from '@/constants'
import { getFrontendSigner } from '@/helpers'
import { getContracts } from '@/helpers/contracts'
import { ERC20Details } from '@/models/ERC20Details.model'
import { toDecimal, toNumber } from '@/utils'
import { ERROR_MESSAGE } from '@/utils/variables/constants'
import { createAsyncThunk } from '@reduxjs/toolkit'

import {
	setERC20Details,
	setERC20DetailsFetched
} from '../slides/erc20Details.slice'
import { RootState } from '..'

export const approveERC20 = createAsyncThunk(
	'erc20Details/approveERC20',
	async (amount: number, { dispatch }) => {
		try {
			dispatch(setERC20DetailsFetched(false))
			const web3Signer: ethers.JsonRpcSigner = await getFrontendSigner()
			const address: string = await web3Signer.getAddress()
			const { doCMock } = getContracts()

			const amountBigint: bigint = toDecimal(amount)

			const approveTx = await doCMock
				.connect(web3Signer)
				.approve(ALLO_CONTRACT_ADDRESS, amountBigint)
			await approveTx.wait()

			dispatch(getERC20Details(address))
			toast.success('Successfully approved')
		} catch (error) {
			console.error('❌ ', error)
			toast.error(ERROR_MESSAGE)
			dispatch(setERC20DetailsFetched(true))
		}
	}
)

export const getERC20Details = createAsyncThunk(
	'erc20Details/getERC20Details',
	async (address: string, { dispatch }) => {
		try {
			const { doCMock } = getContracts()

			const balance: bigint = await doCMock.balanceOf(address)
			const balanceNumber = toNumber(balance)

			const allowance: bigint = await doCMock.allowance(
				address,
				ALLO_CONTRACT_ADDRESS
			)
			const allowanceNumber = toNumber(allowance)

			const erc20Details: ERC20Details = {
				balance: balanceNumber,
				allowance: allowanceNumber
			}

			dispatch(setERC20Details(erc20Details))
			dispatch(setERC20DetailsFetched(true))
		} catch (error) {
			console.error('❌ ', error)
			alert(ERROR_MESSAGE)
			dispatch(setERC20DetailsFetched(true))
		}
	}
)

export const mintERC20 = createAsyncThunk(
	'erc20Details/mintERC20',
	async (amount: number, { dispatch, getState }) => {
		try {
			dispatch(setERC20DetailsFetched(false))
			const web3Signer: ethers.JsonRpcSigner = await getFrontendSigner()
			const { doCMock } = getContracts()

			const state = getState() as RootState
			const erc20Details: ERC20Details = state.erc20Details.erc20Details

			const amountBigint: bigint = toDecimal(amount)

			const mintTx = await doCMock.connect(web3Signer).mint(amountBigint)
			await mintTx.wait()

			const updatedErc20Details: ERC20Details = {
				...erc20Details,
				balance: erc20Details.balance + amount
			}

			dispatch(setERC20Details(updatedErc20Details))
			dispatch(setERC20DetailsFetched(true))
			toast.success('Minted successfully')
		} catch (error) {
			console.error('❌ ', error)
			toast.error(ERROR_MESSAGE)
			dispatch(setERC20DetailsFetched(true))
		}
	}
)
