import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CountryDropdown from '../CountryDropdown';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";


const Header = () => {
    return (
        <>
            <div className="headerWrapper">
                <div className="top-strip bg-purple">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">
                            Please be aware of <b>scam</b> products.
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
                                        <button><CiSearch /></button>
                                    </div>
                                    <div className='part-3 d-flex align-items-center ml-auto'>
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