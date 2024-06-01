import IconStep1 from "../../../assets/svg/homeComponet/step1.svg"
import IconStep2 from "../../../assets/svg/homeComponet/step2.svg"
import IconStep3 from "../../../assets/svg/homeComponet/step3.svg"
import IconStep4 from "../../../assets/svg/homeComponet/step4.svg"
import IconStep5 from "../../../assets/svg/homeComponet/step5.svg"
import line1 from "../../../assets/svg/Arrow1.svg"

export default function Home(): JSX.Element {
  return(
    <section className="flex flex-col gap-5">
      <div>
        <h1>Let's get start</h1>
      </div>
      <article className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="relative flex justify-center w-fit p-3 bg-secdcolor rounded-full">
            <img src={IconStep1} alt="Step 1" />
            <img className="absolute bottom-[-15px] rotate-90" src={line1} alt="Decoration Line" />
          </div>
          <div>
            <h4 className="text-secdcolor">Connect your wallet</h4>
            <p className="text-secdcolor text-fontM">Register and connect your digital wallet to start participating in our platform.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex justify-center w-fit p-3 bg-secdcolor rounded-full">
            <img src={IconStep2} alt="Step 2" />
            <img className="absolute bottom-[-15px] rotate-90" src={line1} alt="Decoration Line" />
          </div>
          <div>
            <h4 className="text-secdcolor">Choose one project</h4>
            <p className="text-secdcolor text-fontM">Explore our list of projects and choose those that you are most passionate about or identify with.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex justify-center w-fit p-3 bg-secdcolor rounded-full">
            <img className="w-[95px] h-[65px]" src={IconStep3} alt="Step 3" />
            <img className="absolute bottom-[-15px] rotate-90" src={line1} alt="Decoration Line" />
          </div>
          <div>
            <h4 className="text-secdcolor">Research and read about that project</h4>
            <p className="text-secdcolor text-fontM">Deepen your understanding by reading the description and details provided about each project. Find out how they are making an impact and what goals they are looking to achieve.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex justify-center w-fit p-3 bg-secdcolor rounded-full">
            <img src={IconStep4} alt="Step 4" />
            <img className="absolute bottom-[-15px] rotate-90" src={line1} alt="Decoration Line" />
          </div>
          <div>
            <h4 className="text-secdcolor">Vote for your project</h4>
            <p className="text-secdcolor text-fontM">Use our voting system to express your support for the projects you consider most valuable and meaningful.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex justify-center w-fit p-3 bg-secdcolor rounded-full">
            <img className="w-[95px] h-[65px]" src={IconStep5} alt="Step 5" />
          </div>
          <div>
            <h4 className="text-secdcolor">Help the project with economic support</h4>
            <p className="text-secdcolor text-fontM">If you are in a position to do so, consider contributing financially to the selected project. Every small contribution counts and can make a difference in carrying out important initiatives.</p>
          </div>
        </div>
      </article>
    </section>
  )
}