import './Searchbar.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Notiflix from 'notiflix';

import { ImSearch } from 'react-icons/im';

const Searchbar = ({ onSubmit }) => {
  const [inputData, setInputData] = useState('');

  const onChangeInput = e => {
    setInputData(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } 

    onSubmit(inputData);
    setInputData('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch size={25} />
        </button>

        <input
          className="SearchForm-input"
          name="inputData"
          value={inputData}
          onChange={onChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
