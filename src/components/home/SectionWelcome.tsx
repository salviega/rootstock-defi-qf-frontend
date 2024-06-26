import { Link } from 'react-router-dom'

export default function SectionWelcome(): JSX.Element {
	return (
		<section className='SectionWelcome__Container w-full h-screen bg-secdcolor'>
			<section className='flex justify-between w-full h-full backdrop-brightness-50'>
				<div className='flex flex-col justify-center gap-5 pl-[40px] w-2/4 h-screen'>
					<h1 className='text-pricolor text-headingEx w-m-lg'>
						Quadrik
						<span className='text-thircolor text-headingEx font-semibold'>
							Chain
						</span>
					</h1>
					<h3 className='text-pricolor max-w-lg'>
						An Innovative Method for Decision Making
					</h3>
				</div>
				<div className='flex flex-col justify-center items-end gap-5 pr-[40px] w-2/4'>
					<p className='text-pricolor text-end text-fontL max-w-lg'>
						Adopt Quadratic Voting today to ensure decisions that best reflect
						everyone's values and priorities. Make your vote more fair and
						representative!
					</p>
					<Link to={`/dashboard`}>
						<button className='btn1'>Join Now</button>
					</Link>
				</div>
			</section>
		</section>
	)
}
