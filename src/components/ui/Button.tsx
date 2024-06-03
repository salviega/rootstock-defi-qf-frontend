interface Props {
	bgColor?: string
	color?: string
	sizeFont?: string
	link?: string
	text: string
	textColor?: string
	hoverBgColor?: string
	hoverTextColor?: string
	onClick?: () => Promise<void>
}

export default function Button(props: Props): JSX.Element {
	const handleClick = async () => {
		if (props.onClick) {
			await props.onClick()
		}
	}

	return (
		<button
			className={`w-fit h-fit py-3 px-9 rounded-lg border border-${props.color} text-${props.color} cursor-pointer hover:text-${props.hoverTextColor || props.color} text-font${props.sizeFont} hover:bg-${props.hoverBgColor} transition duration-100 ease-in-out`}
			onClick={handleClick}
		>
			{props.text}
		</button>
	)
}
