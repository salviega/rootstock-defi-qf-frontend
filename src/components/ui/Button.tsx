import { Link } from "react-router-dom"

interface Props {
  text: string
  sizeFont?: string
  link?: string
}

export default function Button(props: Props): JSX.Element {

  return(
    <button className="w-fit h-fit px-9 py-3 bg-transparent rounded-lg border border-pricolor">
      <Link 
      to={`${props.link}`}
      className={`text-pricolor text-font${props.sizeFont}`}>{props.text}</Link>
    </button>
  )
}