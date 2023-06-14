import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ item }) {
  const [onShow, setOnShow] = useState(false);
  const onClick = () => {
    setOnShow(!onShow);
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        onClick={onClick}
        src={item.webformatURL}
        alt={item.tags}
      />
      {onShow && <Modal onClose={onClick} image={item} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
