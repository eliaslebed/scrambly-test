"use client";
import Link from "next/link";
import "./Navigation.scss";

export const NavigationMobile = ({ links }) => {
  return (
    <div className="navigation__core-mobile flex lg:hidden">
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
  );
};
