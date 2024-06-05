import { useContext } from 'react'

import { myContext } from '@/utils/context/context'

export default function CardProjectVote(): JSX.Element {
	const { activeProgressVote, setActiveProgressVote } = useContext(myContext)

	return (
    <div className='flex flex-col items-center max-w-[400px] gap-2 my-auto mx-auto px-4 py-6 border-2 border-secdcolor rounded-lg'>
      <h4 className='text-center'>Give Your Vote!!</h4>
      <p className='text-center'>
        Your vote will help to this project to continue, this is way how you can show your support, it just takes you some minutes. Help to this project to grow up and be part of this ecosystem web3 during this round
      </p>
      <div className='flex gap-5 mx-auto mt-4'>
        <button 
        onClick={() => {
          setActiveProgressVote(2)
        }}
        className={`w-fit h-fit px-9 py-3 bg-thircolor rounded-lg border`}>
          <p className={`text-pricolor text-fontL`}>
            Vote!!
          </p>
        </button>
      </div>
    </div>
	)
}