import { Project as ProjectModel } from '@/models/project.model'

type Props = {
	project: ProjectModel
}

export default function Project(props: Props): JSX.Element {
	const { project } = props
	return (
		<section className='flex flex-col gap-5'>
			<figure>
				<img className='w-full' src={project.banner} alt='Img Project' />
			</figure>
			<div>
				<h2>{project.name}</h2>
				<h4 className='text-textdesc'>{project.slogan}</h4>
			</div>
			<article className='my-5'>
				<h4>About this project</h4>
				<p>{project.description}</p>
			</article>
			<section className='extraInfo__container'>
				<div className='tags'>
					<h4>Tags</h4>
					<div className='flex gap-2 flex-wrap'>
						{project.tags.map((tag: string, index: number) => (
							<span
								className='text-pricolor bg-secdcolor rounded-full px-3 py-1'
								key={index}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className='wallet flex flex-col gap-3'>
					<div className='flex justify-between items-center'>
						<h4>Address Wallet</h4>
						<button className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}>
							<p className='text-pricolor'>Copy Wallet</p>
						</button>
					</div>
					<p className='text-fontM rounded-lg px-2 py-1 border-2 border-secdcolor'>
						{project.recipientId}
					</p>
				</div>
				<div className='extraInfo flex gap-10 mt-5'>
					<div>
						<h4>Media</h4>
						<div className='flex gap-4'>
							{/* TODO: renderizar netwroks */}
							{/* {project.media.map((media: string, index: number) => (
								<img
									className='w-10 h-10 rounded-full'
									src={media}
									alt='Media Project'
									key={index}
								/>
							))} */}
						</div>
					</div>
					<div>
						<h4>Distribute</h4>
						<p className='text-fontM'>{project.amountDistributed}</p>
					</div>
				</div>
			</section>
		</section>
	)
}
