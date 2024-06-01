export default function Nav(): JSX.Element {
  return (
    <nav className="dashboard__container--nav flex items-center justify-evenly w-full h-[100px] px-10 rounded-lg">
      <li>
        <div className="w-fit pr-5 border-b-2 border-secdcolor">
          <span className="text-secdcolor text-fontL font-semibold">State Round</span>
        </div>
        <p className="text-thircolor text-fontM">Completed</p>
      </li>
      <li>
        <div className="w-fit pr-5 border-b-2 border-secdcolor">
          <span className="text-secdcolor text-fontL font-semibold">Total In Pool</span>
        </div>
        <p className="text-thircolor text-fontM">2.800 DAI</p>
      </li>
      <li>
        <div className="w-fit pr-5 border-b-2 border-secdcolor">
          <span className="text-secdcolor text-fontL font-semibold">Matching Pool</span>
        </div>
        <p className="text-thircolor text-fontM">1000 DAI</p>
      </li>
      <li>
        <div className="w-fit pr-5 border-b-2 border-secdcolor">
          <span className="text-secdcolor text-fontL font-semibold">Total Donations</span>
        </div>
        <p className="text-thircolor text-fontM">1</p>
      </li>
    </nav>
  )
}