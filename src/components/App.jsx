import React, { useState, useEffect } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import './App.css';
import { fetchImages } from './fetchImages/fetchImages';
import Searchbar from './Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImagesData = async () => {
      if (inputData.trim() === '') {
        setStatus('idle');
        return;
      }

      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          setStatus('rejected');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setItems(prevItems => [...prevItems, ...hits]);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchImagesData();
  }, [inputData, page]);

  const handleSubmit = inputData => {
    setItems([]);
    setPage(1);
    setInputData(inputData);
  };

  const onNextPage = async () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={onNextPage} />}
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={onNextPage} />
        )}
      </div>
    );
  }
};

export default App;
