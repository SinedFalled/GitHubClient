import classNames from "classnames";
import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

export type HeaderProps = {
  classname: string;
  color?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { classname, ...rest } = props;
  return (
    <div className={classNames(styles.headerMain, classname)} {...rest}>
      <div className="headerLogo">
        <img
          className="imageHeaderLogo"
          src="./../../assets/react.svg"
          alt=""
        ></img>
        <div>
          <Link to="/">Search</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
