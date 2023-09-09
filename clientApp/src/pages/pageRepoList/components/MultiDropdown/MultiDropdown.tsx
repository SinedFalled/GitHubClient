import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import './MultiDropdown.css';
export type Option = {
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { className, options, value, onChange, disabled, getTitle, ...rest } =
    props;
  const [inputValue, setInputValue] = useState(''); //Инпут велью поиска
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [isListVisible, toggleVisability] = useState(false); //Видимость списка
  function switchVisability(): void {
    isListVisible && !disabled
      ? toggleVisability(false)
      : toggleVisability(true);
  }
  const handleOutsideClick = (e: MouseEvent) => {
    const clickTarget = e.target as Element;
    if (clickTarget instanceof Node && !clickTarget.closest('.Dropdownlist')) {
      toggleVisability(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

const handleOptionClick = (option: Option) => {
  if (!disabled) {
    const optionSelected = value.includes(option);
    if (optionSelected) {
      const newValue = value.filter((v) => v !== option);
      onChange(newValue);
    } else {
      const newValue = [...value, option];
      onChange(newValue);
    }
  }
};
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={classnames('Dropdownlist', className)} onClick={() => toggleVisability(true)} {...rest}>
      <input
        className={classnames("dropdownInput", {'disabled': disabled})}
        value={value.length !== 0 ? getTitle(value) : ''}
        placeholder={value.length === 0 ? getTitle(value) : ''}
        disabled={disabled}
        onChange={handleInputChange}
        // afterSlot={<ArrowDownIcon color="secondary"></ArrowDownIcon>}
      ></input>
      {isListVisible && (
        <div className={classnames('list')}>
          {!disabled && filteredOptions.map((option) => (
            <div
              className={classnames('option')}
              key={option.key}
              onClick={() => handleOptionClick(option)}
            >
              <p>{option.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
