import React from 'react';
import './input.css';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: any) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props) => {
  const {
    className,
    value,
    onChange,
    afterSlot,
    placeholder = 'Текст',
    ...otherProps
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames('Container', className)}>
      <input
        type="text"
        className={classNames('input', {'withIcon': afterSlot})}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...otherProps}
      />
      {afterSlot && <div className="Slot">{afterSlot}</div>}
    </div>
  );
});

export default Input;
