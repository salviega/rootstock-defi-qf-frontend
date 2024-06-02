import { ethers } from 'ethers'

import {
	Allo,
	// eslint-disable-next-line camelcase
	Allo__factory,
	DoCMock,
	// eslint-disable-next-line camelcase
	DoCMock__factory,
	QVSimpleStrategy,
	// eslint-disable-next-line camelcase
	QVSimpleStrategy__factory
} from '@/@types/typechain-types'
import contractsJson from '@/assets/json/deployments/rsktestnet/deployments.json'
import { Contracts } from '@/models/contracts.model'

import { getRpcUrl } from '..'

export function getContracts(): Contracts {
	const rpcUrl: string = getRpcUrl()
	const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(rpcUrl)

	// eslint-disable-next-line camelcase
	const doCMock: DoCMock = DoCMock__factory.connect(
		contractsJson.doCMock.address,
		provider
	)

	// eslint-disable-next-line camelcase
	const allo: Allo = Allo__factory.connect(
		contractsJson.alloInstance.address,
		provider
	)

	const qVSimpleStrategy: (address: string) => QVSimpleStrategy = (
		address: string
	) => {
		// eslint-disable-next-line camelcase
		return QVSimpleStrategy__factory.connect(address, provider)
	}

	return { allo, doCMock, qVSimpleStrategy }
}
