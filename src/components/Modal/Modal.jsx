import { useEffect } from 'react';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal');
export function Modal({ image, onClose }) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>,
    ModalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};
