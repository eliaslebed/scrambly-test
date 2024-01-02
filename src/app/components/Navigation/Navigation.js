"use client";
import Link from "next/link";
import "./Navigation.scss";

export const Navigation = ({ links }) => {
  const handleOnSignIn = () => {
    // here goes implementation of sign in functionality
  };

  return (
    <div className="container mx-auto">
      <div className="navigation__wrapper">
        <div className="navigation__logo md:flex hidden"></div>
        <div className="navigation__mobile-logo flex md:hidden"></div>
        <div className="navigation__core lg:flex hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/${link}`}
              className="navigation__item navigation__icon"
            >
              <span
                className={`navigation__icon navigation__icon--${link} p-5`}
              ></span>
              {link}
            </Link>
          ))}
        </div>
        <div
          className="navigation__button text-base text-center"
          onClick={handleOnSignIn}
        >
          Sign In
        </div>
      </div>
    </div>
  );
};
