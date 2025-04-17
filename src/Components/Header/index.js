import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CountryDropdown from '../CountryDropdown';

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

                <div className="container">
                    <div className="header-flex">
                        <div className="logo-container">
                            <Link to="/">
                                <img src={Logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="location-container">
                            <CountryDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;