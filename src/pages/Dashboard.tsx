import Aside from "@/components/dashboard/Aside"
import Nav from "@/components/dashboard/Nav"
import Layout from "@/components/dashboard/Layout"

/* Components Layout */
import Home from "../components/dashboard/layout/Home"

export default function Dashboard(): JSX.Element {
  return(
    <main className="flex gap-5 w-full h-screen p-3">
      <Aside />
      <section className="flex flex-col w-full gap-5">
        <Nav />
        <Layout>
          <Home />
        </Layout>
      </section>
    </main>
  )
}