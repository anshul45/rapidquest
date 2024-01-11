import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex py-4 px-32  justify-between items-center">
      <Link to="/">
        <i className="ri-home-2-line font-bold text-2xl cursor-pointer"></i>
      </Link>
      <div className="flex gap-16">
        {pathname === "/" ? (
          <Link to="/upload" className="font-semibold text-2xl cursor-pointer">
            <i className="ri-upload-2-line"></i> Video
          </Link>
        ) : (
          <Link to="/" className="font-semibold text-2xl cursor-pointer">
            <i className="ri-play-line border-[1px]"></i> Video
          </Link>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Header;
