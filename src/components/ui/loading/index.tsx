type Props = {
	textColor: string
	textSize: string
}

export default function Loading(props: Props): JSX.Element {
	const { textColor, textSize } = props

	return (
		<p className={`m-auto text-${textColor} text-${textSize}`}>Loading...</p>
	)
}
