import { useState, useEffect } from 'react';
import css from './App.module.css';
import { fetch } from './../services/fetches';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';

export function App() {
  const [status, setStatus] = useState('idle');
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!input) return;
    const fetchImg = async () => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetch(input, page);
        if (hits.length < 1) {
          setStatus('idle');
          toast.warning(
            `Sorry, there are no images ${input}. Please try again.`
          );
        } else {
          toast.success(`Yes! We find ${input}.`);
          setItems(prevItems => [...prevItems, ...hits]);
          setInput(input);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        toast.error('Problem');
        setStatus('rejected');
      }
    };
    fetchImg();
  }, [input, page]);

  const addSubmit = newInput => {
    setStatus('rejected');
    setItems([]);
    setInput(newInput);
    setPage(1);
  };
  const loadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };
  if (status === 'idle') {
    return (
      <div className={css.App}>
        <Searchbar onHandleSubmit={addSubmit} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className={css.App}>
        <Searchbar onHandleSubmit={addSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && items.length > 0 && <Button onClick={loadMore} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className={css.App}>
        <Searchbar onHandleSubmit={addSubmit} />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className={css.App}>
        <Searchbar onHandleSubmit={addSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={loadMore} />
        )}
      </div>
    );
  }
}

