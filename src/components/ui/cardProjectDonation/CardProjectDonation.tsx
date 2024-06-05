import { useContext } from 'react'

import { myContext } from '@/utils/context/context'

export default function CardProjectDonation(): JSX.Element {
	const { setActiveProgressVote, setActivePopUpVote } = useContext(myContext)

	return (
    <div className='flex flex-col items-center max-w-[450px] gap-2 my-auto mx-auto px-4 py-6 border-2 border-secdcolor rounded-lg'>
      <h4 className='text-center'>How Much Will You Donate?</h4>
      <span className='text-thircolor text-center text-fontM font-semibold'>
        The donation is not obligatory, you can skip this step clicking the button continue
      </span>
      <p className='text-center'>
      Give your support to this project with any quantity, the limit is yours. Every single help and support you will give to the project is a step for the advance of web3 and all the team involved in the develop and creation of this project.
      </p>
      <div className='flex flex-col w-full gap-5 mt-4 px-3'>
        <div>
          <input className="w-full border-b-2 border-secdcolor pb-2" type="number" placeholder="Amount" />
        </div>
        <div className='flex flex-col gap-3'>
          <button className='w-full h-fit px-9 py-3 bg-thircolor rounded-lg border'>
            <p className='text-pricolor text-fontL'>
              Accept
            </p>
          </button>
          <button 
          onClick={() => {
            setActivePopUpVote(false)
            setActiveProgressVote(0)
            console.log()
          }}
          className='w-full h-fit px-9 py-3 bg-pricolor rounded-lg border-2 border-thircolor'>
            <p className='text-thircolor text-fontL'>
              Next
            </p>
          </button>
        </div>
      </div>
    </div>
	)
}