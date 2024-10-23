import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { FaBalanceScale } from 'react-icons/fa'
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";

type Props = {}

const MainSideBar = (props: Props) => {
  return (
        <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">

          <button className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-solid border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">

            <i className="fas fa-ellipsis-v"></i>

          </button>

          <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">

            <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">

              <div className="md:flex-col md:min-w-full flex flex-col list-none">
                
        {/* Forum */}
                <Link 
                    to='company-profile' 
                    className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
                >
                <ImProfile />
                <h6 className='ml-3'>Forum</h6>
                </Link>

        {/* Skibidi 1 */}
                <Link 
                    to='income-statement' 
                    className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
                >
                <GiReceiveMoney />
                <h6 className='ml-3'>Skibidi 1</h6>
                </Link>

        {/* Skibidi 2 */}
                <Link 
                    to='balance-sheet' 
                    className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
                >
                <FaBalanceScale />
                <h6 className='ml-3'>Skibidi 2</h6>
                </Link>

        {/* Skibidi 3 */}
                <Link 
                    to='cashflow-statement' 
                    className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
                >
                <FaMoneyCheckDollar />
                <h6 className='ml-3'>Skibidi 3</h6>
                </Link>
                
              </div>

            </div>

          </div>

        </nav>
  )
}

export default MainSideBar