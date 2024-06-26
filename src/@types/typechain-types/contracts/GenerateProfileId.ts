/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
	BaseContract,
	BigNumberish,
	BytesLike,
	FunctionFragment,
	Result,
	Interface,
	AddressLike,
	ContractRunner,
	ContractMethod,
	Listener
} from 'ethers'
import type {
	TypedContractEvent,
	TypedDeferredTopicFilter,
	TypedEventLog,
	TypedListener,
	TypedContractMethod
} from '../common'

export interface GenerateProfileIdInterface extends Interface {
	getFunction(nameOrSignature: 'generateProfileId'): FunctionFragment

	encodeFunctionData(
		functionFragment: 'generateProfileId',
		values: [BigNumberish, AddressLike]
	): string

	decodeFunctionResult(
		functionFragment: 'generateProfileId',
		data: BytesLike
	): Result
}

export interface GenerateProfileId extends BaseContract {
	connect(runner?: ContractRunner | null): GenerateProfileId
	waitForDeployment(): Promise<this>

	interface: GenerateProfileIdInterface

	queryFilter<TCEvent extends TypedContractEvent>(
		event: TCEvent,
		fromBlockOrBlockhash?: string | number | undefined,
		toBlock?: string | number | undefined
	): Promise<Array<TypedEventLog<TCEvent>>>
	queryFilter<TCEvent extends TypedContractEvent>(
		filter: TypedDeferredTopicFilter<TCEvent>,
		fromBlockOrBlockhash?: string | number | undefined,
		toBlock?: string | number | undefined
	): Promise<Array<TypedEventLog<TCEvent>>>

	on<TCEvent extends TypedContractEvent>(
		event: TCEvent,
		listener: TypedListener<TCEvent>
	): Promise<this>
	on<TCEvent extends TypedContractEvent>(
		filter: TypedDeferredTopicFilter<TCEvent>,
		listener: TypedListener<TCEvent>
	): Promise<this>

	once<TCEvent extends TypedContractEvent>(
		event: TCEvent,
		listener: TypedListener<TCEvent>
	): Promise<this>
	once<TCEvent extends TypedContractEvent>(
		filter: TypedDeferredTopicFilter<TCEvent>,
		listener: TypedListener<TCEvent>
	): Promise<this>

	listeners<TCEvent extends TypedContractEvent>(
		event: TCEvent
	): Promise<Array<TypedListener<TCEvent>>>
	listeners(eventName?: string): Promise<Array<Listener>>
	removeAllListeners<TCEvent extends TypedContractEvent>(
		event?: TCEvent
	): Promise<this>

	generateProfileId: TypedContractMethod<
		[_nonce: BigNumberish, _owner: AddressLike],
		[string],
		'view'
	>

	getFunction<T extends ContractMethod = ContractMethod>(
		key: string | FunctionFragment
	): T

	getFunction(
		nameOrSignature: 'generateProfileId'
	): TypedContractMethod<
		[_nonce: BigNumberish, _owner: AddressLike],
		[string],
		'view'
	>

	filters: {}
}
