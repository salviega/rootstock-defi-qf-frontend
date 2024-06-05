export const ALLO_CONTRACT_ADDRESS: string =
	'0xe7dA47ac67F04044F7783D528F11cDb309b5D2e2'

export const ALLO_PROFILE_ID: string =
	'0xd9cf080ed95e558cfb8bd37a61758a18f7c3bf79221811f810879ac73862e3d8'

export const CHAIN_ID: number = 31

export const QUADRIKCHAIN_ADMIN_ADDRESS: string =
	'0x7753E5f36f20B14fFb6b6a61319Eb66f63abdb0b'

export const ROUND_ADDRESS: string =
	'0x9FfeA56f609c4581ed4cd58E85E9c8C9905D1b1B'

export const setNetworkMessage = () => {
	const network =
		import.meta.env.VITE_ENABLE_TESTNETS === 'true' ? 'RSK' : 'RSK testnet'

	return `Please switch to ${network} network`
}

export const NETWORK_CHANGE_MESSAGE: string = setNetworkMessage()
