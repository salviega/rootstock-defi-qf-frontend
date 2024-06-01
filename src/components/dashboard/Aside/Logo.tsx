import LogoSVG from '../../../assets/svg/asideComponent/Logo.svg'
import { Link } from 'react-router-dom'

export default function Logo(): JSX.Element {
  return(
    <Link to='/' className='flex items-center gap-2'>
      <img 
      src={LogoSVG} 
      alt="Logo de QuadrikChain" />
      <h4 className='text-pricolor'>Quadrik<span className='text-thircolor font-title font-semibold'>Chain</span></h4>
    </Link>
  )
}