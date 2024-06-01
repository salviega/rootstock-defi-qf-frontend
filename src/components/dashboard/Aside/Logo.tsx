import LogoSVG from '../../../assets/svg/asideComponent/Logo.svg'

export default function Logo(): JSX.Element {
  return(
    <div className='flex items-center gap-2'>
      <img 
      src={LogoSVG} 
      alt="Logo de QuadrikChain" />
      <h4 className='text-pricolor'>Quadrik<span className='text-thircolor font-title font-semibold'>Chain</span></h4>
    </div>
  )
}