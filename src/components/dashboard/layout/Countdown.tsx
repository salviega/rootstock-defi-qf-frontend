import { useCountdown } from '@/hooks/useCountdown'

export default function Countdown({
	targetDate
}: {
	targetDate: Date
}): JSX.Element {
	const [days, hours, minutes, seconds] = useCountdown(targetDate)

	return <Timer days={days} hours={hours} minutes={minutes} seconds={seconds} />
}

function Timer(props: {
	days: number
	hours: number
	minutes: number
	seconds: number
}): JSX.Element {
	const { days, hours, minutes, seconds } = props

	return (
		<section className='flex gap-2'>
			<div className='flex flex-col items-center justify-center min-w-[30px]'>
				<h5 className='item-time'>{days}</h5>
			</div>
			<div className='flex flex-col items-center justify-center min-w-[30px]'>
				<h5 className='item-time'>{hours}</h5>
			</div>
			<div className='flex flex-col items-center justify-center min-w-[30px]'>
				<h5 className='item-time'>{minutes}</h5>
			</div>
			<div className='flex flex-col items-center justify-center min-w-[30px]'>
				<h5 className='item-time'>{seconds}</h5>
			</div>
		</section>
	)
}
