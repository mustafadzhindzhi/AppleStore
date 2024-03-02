import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Navigation.module.scss';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

interface CustomIconProps {
  className: string;
  children?: React.ReactNode;
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, children }) => (
  <span className={className}>
    {children}
  </span>
);

export const Navitation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className={style['navbar']}>
      <Link to="/">
        <img src="src/assets/Macstore ltd.png" alt="" className={style['header-logo']} />
      </Link>
      <div className={style['vertical-line']}></div>
      <div className={style['header-logo-right']}>
        <img src="src/assets/mac.png" alt="" />
      </div>
      <nav className={style['navbar__nav']}>
        <div className={style['navbar__products']}>
          <ul className={style['navbar__products-ul']}>
            {['Mac', 'Ipad', 'Iphones', 'Watch', 'Airpod', 'Аксесоари', 'Промо'].map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={hoveredIndex !== null && hoveredIndex !== index ? style['is-hovered'] : ''}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className={style['navbar__products-icons']}>
        <CustomIcon className={style['icon']}>
          <FaSearch />
        </CustomIcon>
        <CustomIcon className={style['icon']}>
          <FiShoppingCart />
        </CustomIcon>
        <CustomIcon className={style['icon']}>
          <FaUser />
        </CustomIcon>
      </div>
    </header>
  );
};

export default Navitation;
