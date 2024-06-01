import IconItem1 from '../../../assets/svg/asideComponent/item1.svg'
import IconItem2 from '../../../assets/svg/asideComponent/item2.svg'
import IconItem3 from '../../../assets/svg/asideComponent/item3.svg'

export default function Views(): JSX.Element {

  return(
    <section className="flex flex-col items-start gap-3 w-full px-8">
      <div className="text-start w-full pb-1 border-b-2 border-thircolor">
        <h4 className="text-thircolor">Views</h4>
      </div>
      <nav className='flex flex-col gap-5 w-full'>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={IconItem1} alt="Item 1" />
          <span className="text-pricolor text-fontL">Home</span>     
        </li>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={IconItem2} alt="Item 2" />
          <span className="text-pricolor text-fontL">Faucet</span>
        </li>
        <li className='item-view flex items-center w-full gap-3 rounded-lg'>
          <img src={IconItem3} alt="Item 3" />
          <span className="text-pricolor text-fontL">Dashboard</span>
        </li>
      </nav>
    </section>
  )
}