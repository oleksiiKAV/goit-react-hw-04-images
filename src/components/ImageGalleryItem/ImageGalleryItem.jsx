import './ImageGalleryItem.css';
import Modal from '../Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(prevState => !prevState);
  };

  const { webformatURL } = item;
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={onModal}
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;
