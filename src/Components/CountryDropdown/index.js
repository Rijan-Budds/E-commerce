import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';

const CountryDropdown = () => {
  return (
    <Button className="countryDrop">
      <div className="info d-flex flex-column">
        <span className='lable'>YOUR LOCATION</span>
        <span className='name'>Kathmandu</span>
      </div>
      <span className="ml-auto"><FaAngleDown /></span>
    </Button>
  );
}

export default CountryDropdown;