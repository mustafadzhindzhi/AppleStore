import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";
import { FaSearch, FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import CustomIcon from "./CustomIcon";

const Navigation = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className={style["navbar"]}>
      <Link to="/">
        <img
          src="src/assets/Macstore ltd.png"
          alt=""
          className={style["header-logo"]}
        />
      </Link>
      <div className={style["vertical-line"]}></div>
      <div className={style["header-logo-right"]}>
        <img src="src/assets/logo2.png" alt="" />
      </div>
      <nav className={style["navbar__nav"]}>
        <div className={style["navbar__products"]}>
          <ul className={style["navbar__products-ul"]}>
            {["Mac", "iPad", "iPhone", "Watch", "AirPods", "Accessories"].map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={hoveredIndex !== null && hoveredIndex !== index ? style["is-hovered"] : ""}
              >
                <Link to={`/${item.toLowerCase()}`} onClick={() => setToggleMenu(false)}>
                  {item}
                </Link>
              </li>
            ))}
            <li
              onMouseEnter={() => setHoveredIndex(6)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={hoveredIndex !== null && hoveredIndex === 6 ? style["is-hovered"] : ""}
            >
              <Link to="/promo" onClick={() => setToggleMenu(false)}>
                Promo
                <span className={style["promo-sign"]}>
                  <span className={style["percentage"]}>%</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={style["navbar__products-icons"]}>
        <CustomIcon className={style["icon"]}><FaSearch /></CustomIcon>
        <CustomIcon className={style["icon"]}><FiShoppingCart /></CustomIcon>
        <CustomIcon className={style["icon"]}>
          <Link to="/signUp">
            <FaUser />
          </Link>
        </CustomIcon>
      </div>
      <div
        className={`${style["app__navbar-smallscreen"]} ${
          toggleMenu ? style["slide-in"] : style["slide-out"]
        }`}
      >
        <button className={style["menu-button"]} onClick={handleMenuToggle}>
          {toggleMenu ? <FaTimes size={25} /> : <MdMenu size={25} />}
        </button>
        {toggleMenu && (
          <div
            className={`${style["app__navbar-smallscreen_overlay"]} ${
              toggleMenu ? style["slide-in"] : style["slide-out"]
            }`}
          >
            <ul className={style["app__navbar-smallscreen_links"]}>
              <li>
                <Link to="/" onClick={() => setToggleMenu(false)}>
                  Home
                </Link>
              </li>
              {["Mac", "iPad", "iPhone", "Watch", "AirPods", "Accessories"].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase()}`} onClick={() => setToggleMenu(false)}>
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/promo" onClick={() => setToggleMenu(false)}>
                  Promo
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;