import React from 'react';
import './button.css';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  disabled?: boolean
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  disabled,
  ...otherProps
}) => {
  const buttonClasses = classNames('button', className, { 'loading': loading }, {'disabled': disabled});
  const isDisabled = disabled ? true : loading
  return (
    <button className={buttonClasses} disabled={isDisabled} {...otherProps}>
      {/* {loading && <Loader size="s" className="buttonLoader"/>} */}
      {children}
    </button>
  );
};

export default Button;
