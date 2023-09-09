import classNames from 'classnames';
import Text from 'components/Text';
import React, { Children } from 'react';
import Button from 'components/Button';
import './card.css';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
  } = props;
  const cardClasses = classNames('card', className);
  return (
    <div className={cardClasses} onClick={onClick}>
      <img className="cardImage" src={image} alt="oopsie"></img>
      <div className="cardBody">
        <div className="cardDesription">
          {captionSlot && (
            <Text
              className={'caption'}
              children={captionSlot}
              color="secondary"
              maxLines={1}
              view="p-14"
            ></Text>
          )}
          <Text
            className={'title'}
            children={title}
            maxLines={2}
            view="p-20"
          ></Text>
          <Text
            className={'subtitle'}
            children={subtitle}
            maxLines={3}
            view="p-16"
            color="secondary"
          ></Text>
        </div>
        <div className={'cardFooter'}>
            {contentSlot && <div className='footerContent'><p>{contentSlot}</p></div>}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
