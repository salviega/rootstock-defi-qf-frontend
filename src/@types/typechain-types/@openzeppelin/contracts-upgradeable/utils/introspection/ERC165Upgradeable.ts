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
	EventFragment,
	ContractRunner,
	ContractMethod,
	Listener
} from 'ethers'
import type {
	TypedContractEvent,
	TypedDeferredTopicFilter,
	TypedEventLog,
	TypedLogDescription,
	TypedListener,
	TypedContractMethod
} from '../../../../common'

export interface ERC165UpgradeableInterface extends Interface {
	getFunction(nameOrSignature: 'supportsInterface'): FunctionFragment

	getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment

	encodeFunctionData(
		functionFragment: 'supportsInterface',
		values: [BytesLike]
	): string

	decodeFunctionResult(
		functionFragment: 'supportsInterface',
		data: BytesLike
	): Result
}

export namespace InitializedEvent {
	export type InputTuple = [version: BigNumberish]
	export type OutputTuple = [version: bigint]
	export interface OutputObject {
		version: bigint
	}
	export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
	export type Filter = TypedDeferredTopicFilter<Event>
	export type Log = TypedEventLog<Event>
	export type LogDescription = TypedLogDescription<Event>
}

export interface ERC165Upgradeable extends BaseContract {
	connect(runner?: ContractRunner | null): ERC165Upgradeable
	waitForDeployment(): Promise<this>

	interface: ERC165UpgradeableInterface

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

	supportsInterface: TypedContractMethod<
		[interfaceId: BytesLike],
		[boolean],
		'view'
	>

	getFunction<T extends ContractMethod = ContractMethod>(
		key: string | FunctionFragment
	): T

	getFunction(
		nameOrSignature: 'supportsInterface'
	): TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>

	getEvent(
		key: 'Initialized'
	): TypedContractEvent<
		InitializedEvent.InputTuple,
		InitializedEvent.OutputTuple,
		InitializedEvent.OutputObject
	>

	filters: {
		'Initialized(uint8)': TypedContractEvent<
			InitializedEvent.InputTuple,
			InitializedEvent.OutputTuple,
			InitializedEvent.OutputObject
		>
		Initialized: TypedContractEvent<
			InitializedEvent.InputTuple,
			InitializedEvent.OutputTuple,
			InitializedEvent.OutputObject
		>
	}
}
