import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";
import { FaSearch, FaUser } from 'react-icons/fa'; 
import { FiShoppingCart } from 'react-icons/fi'; 
import { ReactNode } from "react";

interface CustomIconProps {
    className: string;
    children?: ReactNode;
  }
  
  const CustomIcon: React.FC<CustomIconProps> = ({ className, children }) => (
    <span className={className}>
      {children}
    </span>
  );

export const Navitation = () => {
  return (
      <header className={style["navbar"]}>
        <Link to="/">
          <img src="src/assets/MacStore.png" alt="" className={style['header-logo']} />
        </Link>
        <nav className={style["navbar__nav"]}>
          <div className={style["navbar__products"]}>
            <ul className={style["navbar__products-ul"]}>
              <li>Mac</li>
              <li>Ipad</li>
              <li>Iphone</li>
              <li>Watch</li>
              <li>AirPods</li>
              <li>Аксесоари</li>
              <li>Промоции</li>
            </ul>
          </div>
        </nav>
        <div className={style["navbar__products-icons"]}>
          <CustomIcon className={style["icon"]}>
              <FaSearch />
            </CustomIcon>
            <CustomIcon className={style["icon"]}>
              <FiShoppingCart />
            </CustomIcon>
            <CustomIcon className={style["icon"]}>
              <FaUser />
            </CustomIcon>
          </div>
      </header>
  );
};

export default Navitation;
