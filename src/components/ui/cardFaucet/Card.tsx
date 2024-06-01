import ButtonWallet from "@/components/ui/walletBtn/ButtonWallet"

import Button from "../Button"

interface Props {
  number: number
}

export default function Card(props: Props) {
  return(
    <>
      {
        props.number === 1 ? (
          <div className="flex flex-col items-center max-w-[400px] gap-4 my-auto mx-0 px-4 py-6 border-2 border-secdcolor rounded-lg">
            <h4 className="text-center">Get Tokens</h4>
            <p className="text-center">This is a test DAI faucet that will allow you to interact with QuadrikChain. By clicking the GET button below you will receive 1,000 DAI.</p>
            <div className="flex gap-5 mx-auto">
              <div className="flex gap-1">
                <span className="text-thircolor font-semibold">Balance:</span>
                <p>0</p>
              </div>
              <div className="flex gap-1">
                <span className="text-thircolor font-semibold">Allowance:</span>
                <p>0</p>
              </div>
            </div>
            <ButtonWallet />
          </div>
        ) : 
        props.number === 2 ? (
          <div className="flex flex-col items-center max-w-[400px] gap-4 my-auto mx-0 px-4 py-6 border-2 border-secdcolor rounded-lg">
            <h4 className="text-center">Approve Tokens</h4>
            <p className="text-center">By clicking the button below you will approve the Allow contract (address above & below) to move test DAI (the amount you specify) from your wallet.</p>
            <div className="flex gap-5 mx-auto">
              <Button text="Approve" sizeFont="L" link="/dashboard" color="thircolor"/>
            </div>
          </div>  
        ) : null
      }
    </>
  )
}