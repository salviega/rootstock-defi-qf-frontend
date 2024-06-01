import line1 from "../../assets/img/upperdottedline.png"
import line2 from "../../assets/img/lowerdottedline.png"

export default function WhyUs (): JSX.Element {

  return(
    <section className="flex flex-col gap-14 items-center max-w-[1200px] mx-auto my-0">
      <div className="flex flex-col gap-5">
        <h1 className="text-thircolor text-center">Why Us?</h1>
        <p className="text-center max-w-screen-lg text-fontL">This system encourages a more equitable and thoughtful distribution of votes, allowing minority voices to significantly influence the outcome. Promotes more representative and balanced decision-making in communities and organizations.</p>
      </div>
      <section className="relative">
        <img 
        className="absolute w-[850px] top-10 right-0"
        src={line1} 
        alt="Line Decoation" />
        <div className="relative flex flex-col">
          <div className="flex justify-center w-fit px-5 py-2 bg-secdcolor rounded-lg">
            <h2 className="text-pricolor">Quadratic</h2>
          </div>
          <article className="pb-8 px-28">
            <p className="text-fontL">Quadratic Voting is a novel method where participants express preferences and intensity. Unlike traditional methods, voters use credits to vote. However, assigning multiple votes increases quadratically, making strong preferences costly.</p>
          </article>
          <img src={line2} alt="Line Decoation" />
        </div>
      </section>
      <section className="relative">
        <img 
        className="absolute w-[900px] top-10 left-0"
        src={line1} 
        alt="Line Decoation" />
        <div className="relative flex flex-col items-end">
          <div className="flex justify-center w-fit px-10 py-2 bg-secdcolor rounded-lg">
            <h2 className="text-pricolor">Voting</h2>
          </div>
          <article className="pb-8 px-28">
            <p className="text-fontL text-end">This system promotes a more equitable distribution of votes, giving minorities a voice to influence the outcome. It encourages a more representative and balanced decision-making process, ensuring it reflects the values and priorities of the group as a whole.</p>
          </article>
          <img className="w-full" src={line2} alt="Line Decoation" />
        </div>
      </section>
    </section>
  )
}