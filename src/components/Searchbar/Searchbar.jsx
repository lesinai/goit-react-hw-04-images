import css from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearchHeart } from 'react-icons/bs';
import { toast } from 'react-toastify';

export function Searchbar({ onHandleSubmit }) {
  const [input, setInput] = useState('');
  const onChange = e => {
    setInput(e.target.value.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();
    if (input.trim() === '' || input.trim() === setInput.input) {
      toast.warning('You did not change the field, try again.');
      return;
    }
    onHandleSubmit(input);
    setInput('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <BsSearchHeart className={css.SearchForm_button_icon} />
        </button>

        <input
          className={css.SearchForm_input}
          name="input"
          value={input}
          onChange={onChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
