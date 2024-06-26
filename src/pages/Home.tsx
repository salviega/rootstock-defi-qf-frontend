import HowWorks from '@/components/home/HowWorks'
import SectionWelcome from '@/components/home/SectionWelcome'
import WhyUs from '@/components/home/WhyUs'

export default function Home(): JSX.Element {
	return (
		<main className='flex flex-col gap-20 mb-12'>
			<SectionWelcome />
			<WhyUs />
			<HowWorks />
		</main>
	)
}
