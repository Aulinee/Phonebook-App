import "../../style.css"
import Logo from '../../assets/Logo.png';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-blue-500 p-5'>
        <div className='flex items-center flex-shrink-0 text-white ml-10 mr-20'>
            <img className='fill-current h-13 w-36 mr-2' src={Logo} alt='logo'></img>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <Link exact to="/">
                    <a className="MuseoSans-700 text-white mr-9 hover:opacity-75 cursor-pointer">Contact </a>
                </Link>
                <Link exact to="/manage">
                    <a className="MuseoSans-700 text-white mr-9 hover:opacity-75 cursor-pointer">Manage</a>
                </Link>
            </div>
        </div>
    </nav>
  )
}