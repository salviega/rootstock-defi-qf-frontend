import IconProject1 from '../../../assets/svg/asideComponent/LogoProject1.svg'
import IconProject2 from '../../../assets/svg/asideComponent/LogoProject2.svg'
import AddProject from '../../../assets/svg/asideComponent/addIcon.svg'

export default function Projects(): JSX.Element {

  return(
    <section className="flex flex-col items-start gap-3 w-full px-8">
      <div className="text-start w-full pb-1 border-b-2 border-thircolor">
        <h4 className="text-thircolor">Projects</h4>
      </div>
      <nav className='flex flex-col gap-5 w-full'>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={IconProject1} alt="Item 1" />
          <span className="text-pricolor text-fontM">QUANTUMNET</span>     
        </li>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={IconProject2} alt="Item 2" />
          <span className="text-pricolor text-fontM">ECONET DYNAMICS</span>
        </li>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={AddProject} alt="Item 3" />
          <span className="text-pricolor text-fontM">CREATE A NEW PROJECT</span>
        </li>
      </nav>
    </section>
  )
}