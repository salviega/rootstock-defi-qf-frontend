import { useContext, useState } from 'react'

import { myContext } from '@/utils/context/context'

export default function ToggleFaucet(): JSX.Element {
	const { setIsClicked } = useContext(myContext)

	const [isMint, setIsMint] = useState(true)
	const [isApprove, setIsApprove] = useState(false)

	return (
		<div className='flex w-fit border-2 border-secdcolor rounded-lg'>
			<div
				className={`${isMint ? 'bg-secdcolor px-5 py-2' : 'px-5 py-2'} cursor-pointer`}
			>
				<span
					onClick={() => {
						setIsClicked(0)
						setIsMint(true)
						setIsApprove(false)
					}}
					className={`${isMint ? 'text-pricolor font-semibold' : 'text-textdescolor'}`}
				>
					Mint
				</span>
			</div>
			<div
				className={`${isApprove ? 'bg-secdcolor px-5 py-2' : 'px-5 py-2'} cursor-pointer`}
			>
				<span
					onClick={() => {
						setIsClicked(1)
						setIsMint(false)
						setIsApprove(true)
					}}
					className={`${isApprove ? 'text-pricolor font-semibold' : 'text-textdescolor'}`}
				>
					Approve
				</span>
			</div>
		</div>
	)
}
