import classNames from "classnames";
import React from "react";
import styles from "./header.module.scss";

export type HeaderProps = {
  classname: string;
  color?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { classname, ...rest } = props;
  return (
    <div className={classNames(styles.headerMain, classname)} {...rest}>
      <div className="headerLogo">
        <img className="imageHeaderLogo" src="./../../assets/react.svg" alt=""></img>
      </div>
    </div>
  );
};

export default Header;
