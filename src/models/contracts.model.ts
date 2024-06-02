import { Allo, DoCMock, QVSimpleStrategy } from '@/@types/typechain-types'

export interface Contracts {
	allo: Allo
	doCMock: DoCMock
	qVSimpleStrategy: (address: string) => QVSimpleStrategy
}
