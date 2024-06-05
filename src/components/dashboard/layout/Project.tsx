import React, { useState } from 'react'

import { Project as ProjectModel } from '@/models/project.model'

import GithubSVG from '../../../assets/svg/projectsComponents/IconGithub.svg'
import TwitterSVG from '../../../assets/svg/projectsComponents/IconTwitter.svg'
import WebsiteSVG from '../../../assets/svg/projectsComponents/IconWebsite.svg'

type Props = {
	project: ProjectModel
}

export default function Project(props: Props) : JSX.Element {
	const { project } = props
	const [ copyText, setCopyText ] = useState(project.recipientId);

	const takeValue = () => {
		navigator.clipboard.writeText(copyText).then(() => {
			alert('Copied!');
		}).catch((err) => {
			alert(err);
		})
	}

	return (
		<section className='flex flex-col gap-5'>
			<figure className='relative'>
				<img className='w-full max-h-[450px] rounded-xl' src={project.banner} alt='Img Project' />
				<img className='absolute bottom-0 left-0 w-[200px] h-[150px] rounded-xl' src={project.logo} alt="Img logo" />
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
				<div className='tags flex flex-col gap-3'>
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
						<button 
						onClick={takeValue}
						className={`w-fit h-fit px-5 py-3 bg-thircolor rounded-lg`}>
							<p className='text-pricolor'>Copy Wallet</p>
						</button>
					</div>
					<p className='text-fontM rounded-lg px-2 py-1 border-2 border-secdcolor'>
						{project.recipientId}
					</p>
				</div>
				<div className='extraInfo flex gap-12 mt-5'>
					<div>
						<h4>Distribute</h4>
						<p className='text-fontM'>{project.amountDistributed} Doc</p>
					</div>
					<div>
						<h4>Media</h4>
						<div className='flex gap-6'>
							<a href={project.github}>
								<img src={GithubSVG} alt="Icon Network" />
							</a>
							<a href={project.twitter}>
								<img src={TwitterSVG} alt="Icon Network" />
							</a>
							<a href={project.website}>
								<img src={WebsiteSVG} alt="Icon Network" />
							</a>
						</div>
					</div>
				</div>
			</section>
		</section>
	)
}
