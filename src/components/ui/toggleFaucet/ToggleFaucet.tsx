import { useContext, useState } from 'react'

import { useAppSelector } from '@/store'
import { myContext } from '@/utils/context/context'

export default function ToggleFaucet(): JSX.Element {
	const { setIsClicked } = useContext(myContext)

	const [isMint, setIsMint] = useState(true)
	const [isApprove, setIsApprove] = useState(false)

	const erc20DetailsFetched: boolean = useAppSelector(
		state => state.erc20Details.erc20DetailsFetched
	)

	return (
		<div className='flex w-fit border-2 border-secdcolor rounded-lg'>
			<button
				className={`${isMint ? 'bg-secdcolor px-5 py-2 text-pricolor font-semibold' : 'px-5 py-2 text-textdescolor cursor-pointer'}`}
				disabled={!erc20DetailsFetched}
				onClick={() => {
					setIsClicked(0)
					setIsMint(true)
					setIsApprove(false)
				}}
			>
				Mint
			</button>
			<button
				className={`${isApprove ? 'bg-secdcolor px-5 py-2 text-pricolor font-semibold' : 'px-5 py-2 text-textdescolor cursor-pointer'}`}
				disabled={!erc20DetailsFetched}
				onClick={() => {
					setIsClicked(1)
					setIsMint(false)
					setIsApprove(true)
				}}
			>
				Approve
			</button>
		</div>
	)
}
