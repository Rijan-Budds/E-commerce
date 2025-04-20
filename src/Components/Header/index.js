import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CountryDropdown from '../CountryDropdown';
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";


const Header = () => {
    return (
        <>
            <div className="headerWrapper">
                <div className="top-strip bg-purple">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">
                            Please be aware of <b>scams.</b>
                        </p>
                    </div>
                </div>

                <header className="header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className='logoWrapper col-sm-2'>
                                <Link to="/">
                                    <img src={Logo} alt="Logo" />
                                </Link>
                            </div>
                            <div className="col-sm-10">
                                <div className="d-flex align-items-center">
                                    <CountryDropdown />
                                    <div className='headerSearch ml-3'>
                                        <input type='text' placeholder="Search products..." />
                                        <button><FaSearch /></button>
                                    </div>
                                    <div className='part-3 headerNotify ml-4'>
                                        <button className='notify'><IoNotifications /> </button>
                                    </div>
                                    <div className='part-3 headerPost ml-5'>
                                        <button className='post'><IoIosAddCircle /></button>
                                    </div>
                                    <div className='part-3 d-flex align-items-center ml-5'>
                                        <button className='circle'><FaUser /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;