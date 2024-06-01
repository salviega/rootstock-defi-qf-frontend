interface Props {
  children: JSX.Element
}

export default function layout(props: Props): JSX.Element {
  return (
    <section className="h-screen p-4 overflow-y-scroll">
      {props.children}
    </section>
  )
}