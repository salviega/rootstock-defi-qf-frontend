interface Props {
  children: JSX.Element
}

export default function layout(props: Props): JSX.Element {
  return (
    <section className="h-screen">
      {props.children}
    </section>
  )
}