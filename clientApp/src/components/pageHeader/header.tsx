import classNames from "classnames";
import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import gitLogo from "assets/gitLogo.svg";

export type HeaderProps = {
  classname: string;
  color?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { classname, ...rest } = props;
  return (
    <div className={classNames(styles.headerMain, classname)} {...rest}>
      <div className={styles.headerLogo}>
        <img className="imageHeaderLogo" src={gitLogo} alt=""></img>
        <p>gitObserver</p>
      </div>
      <div className={styles.linkBar}>
        <Link to="/"><p>Search</p></Link>
      </div>
      <div className={styles.userPanel}></div>
    </div>
  );
};

export default Header;
