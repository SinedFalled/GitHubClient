import * as React from 'react';
export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...otherProps
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const getMaxLinesStyles = (): React.CSSProperties | undefined => {
    if (maxLines && maxLines > 0) {
      return {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
      };
    }
    return undefined;
  };
  const descToColor = (color?: 'primary' | 'secondary' | 'accent') => {
    const primary = '#000000',
      secondary = '#AFADB5',
      accent = '#518581';
    switch (color) {
      case 'primary':
        return primary;
      case 'secondary':
        return secondary;
      case 'accent':
        return accent;
      default:
        return 'inherit';
    }
  };
  const getStylesByView = (): React.CSSProperties => {
    switch (view) {
      case 'p-20':
        return {
          fontSize: '20px',
          fontStyle: 'normal',
          lineHeight: '24px',
        };
      case 'p-18':
        return {
          fontSize: '18px',
          fontStyle: 'normal',
          lineHeight: '22px',
        };
      case 'p-16':
        return {
          fontSize: '16px',
          fontStyle: 'normal',
          lineHeight: '20px',
        };
      case 'p-14':
        return {
          fontSize: '14px',
          fontStyle: 'normal',
          lineHeight: '18px',
        };
      default:
        return {};
    }
  };
  return (
    <Tag
      className={className}
      style={{
        fontWeight: weight,
        color: descToColor(color),
        ...getMaxLinesStyles(),
        ...getStylesByView(),
      }}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
