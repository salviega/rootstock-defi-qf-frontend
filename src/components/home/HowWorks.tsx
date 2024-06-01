import line1 from '../../assets/svg/Arrow1.svg'
import line2 from '../../assets/svg/Arrow2.svg'

export default function HowWorks (): JSX.Element {

  return(
    <section className="flex flex-col items-center max-w-[1200px] gap-7 mx-auto my-0">
      <div>
        <h1>How Works?</h1>
      </div>
      <section className="howworks__container">
        <div className="flex flex-col relative justify-center items-center gap-5 w-[550px] h-[385px] px-8 bg-secdcolor rounded-lg">
          <h2 className="text-pricolor">Remember To Visit The Faucet</h2>
          <p className="text-pricolor text-fontL">Head to our Faucet to receive voting credits. Think of these as currency to support the options or projects you prefer. Manage your credits wisely, as they are limited.</p>
          <img 
          className='absolute top-2/4 right-[-50px]'
          src={line1} 
          alt="Line Decoration" />
        </div>
        <div className="flex flex-col relative justify-center items-center gap-5 w-[550px] h-[385px] border px-8 border-secdcolor rounded-lg">
          <h2 className="text-secdcolor">Register Your Project</h2>
          <p className="text-secdcolor text-fontL">If you have a project that needs funding, register it. Make sure to detail your proposal so that voters understand and support your initiative.</p>
          <img 
          className='absolute h-[420px] top-2/4 right-[-73px]'
          src={line2} 
          alt="Line Decoration" />
        </div>
        <div className="flex flex-col relative justify-center items-center gap-5 w-[550px] h-[385px] px-8 bg-secdcolor rounded-lg">
          <h2 className="text-pricolor">Await The Results</h2>
          <p className="text-pricolor text-fontL">After the voting round concludes, the administrator will tally and distribute funds according to the votes each project has received. Your participation makes a difference!</p>
          <img className='absolute top-[43%] right-[-50px]'
          src={line1} 
          alt="Line Decoration" />
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-[550px] h-[385px] border px-8 border-secdcolor rounded-lg">
          <h2 className="text-secdcolor">Donate And Vote For Your Favorite</h2>
          <p className="text-secdcolor text-fontL">Use your credits to donate and vote for the projects that interest you the most. Remember, casting multiple votes for the same project has a quadratic cost, so distribute your credits strategically.</p>
        </div>
      </section>
    </section>
  )
}