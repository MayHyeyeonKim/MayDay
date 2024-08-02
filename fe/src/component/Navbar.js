import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBox, faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import * as types from "../constants/product.constants";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const { cartItemQty } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = [
    "Women",
    "Divided",
    "Men",
    "Newborn/Baby",
    "Kids",
    "H&M HOME",
    "Sale",
    "Sustainability",
  ];
  let [width, setWidth] = useState(0);
  const navigate = useNavigate();

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        dispatch({ type: types.SET_SEARCH_KEYWORD, payload: "" });
        return navigate("/");
      }

      let searchKeyword = event.target.value;
      dispatch({ type: types.SET_SEARCH_KEYWORD, payload: searchKeyword });
      navigate(`?name=${event.target.value}`);
    }
  };
  const handleCategoryFilter = (event) => {
    console.log("handleCategoryFilter실행해봄")
  }

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="Search Products"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <>
              <div className="nav-icon welcome-message">
              Welcome, {user.name}!
            </div>
              <div onClick={handleCategoryFilter} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>Logout</span>
                )}
              </div>
              </>) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>Login</span>}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`My Cart(${
                  cartItemQty || 0
                })`}</span>
              )}
            </div>
            <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>My Order</span>}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
        </Link>
      </div>
      <div onClick={logout}  className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>
        {!isMobile && (
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="search"
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
