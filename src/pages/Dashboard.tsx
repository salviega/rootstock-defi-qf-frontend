/* Hooks */
import { useContext } from "react"

/* Dashboard Components */
import Aside from "@/components/dashboard/Aside"
import Nav from "@/components/dashboard/Nav"
import Layout from "@/components/dashboard/Layout"

/* Context */
import { myContext } from "@/utils/context/context"

/* Layout Components */
import Home from "../components/dashboard/layout/Home"
import Faucet from "@/components/dashboard/layout/Faucet"

export default function Dashboard(): JSX.Element {
  const { activeLayout } = useContext(myContext);

  return(
    <main className="flex gap-5 w-full h-screen p-3">
      <Aside />
      <section className="flex flex-col w-full gap-5">
        <Nav />
        <Layout>
          {
            activeLayout === 'home' ? <Home /> : <Faucet />
          }
        </Layout>
      </section>
    </main>
  )
}