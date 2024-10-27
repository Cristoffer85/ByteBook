import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import { IoChatbubblesOutline, IoHomeOutline } from "react-icons/io5";
import { LiaForumbee } from "react-icons/lia";
import { AiOutlineStock } from "react-icons/ai";

type Props = {}

const Sidebar = (props: Props) => {
    const { isLoggedIn } = useAuth();

  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
      <button className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-solid border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none">

            {/*Is Not Logged In*/}
            <>
            {/* Home */}
            <Link to='/home' className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline">
              <IoHomeOutline />
              <i className="fas fa-home"></i>
              <h6 className='ml-3'>Home</h6>
            </Link>
            {/* Forum */}
            <Link to='/forum' className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline">
              <LiaForumbee />
              <i className="fas fa-info"></i>
              <h6 className='ml-3'>Forum</h6>
            </Link>
            {/* Chat */}
            <Link to='/chat' className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline">
              <IoChatbubblesOutline />
              <i className="fas fa-info"></i>
              <h6 className='ml-3'>Chat</h6>
            </Link>
            </>

            {/* Blank Row */}
            <div className="h-6"></div>

            {isLoggedIn() ? (
                <>
                    {/* Finance */}
                    <Link to='/finance' title="Care to do some financin'?" className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline">
                    <AiOutlineStock />
                    <i className="fas fa-home"></i>
                    <h6 className='ml-3'>Finance</h6>
                    </Link>
                </>
                    ) : (
                    <></>
                )}     
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar;
