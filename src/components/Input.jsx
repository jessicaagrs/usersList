import { CiSearch } from 'react-icons/ci';
import '../App.css';

const Input = ({ onChange }) => {
  return (
    <div className='containerInput'>
      <label
        htmlFor='search'
        data-label='Search'
      >
        <CiSearch className='iconSearch' />
      </label>
      <input
        type='text'
        name='search'
        id='search'
        className='inputSearch'
        onChange={onChange}
        placeholder='Search users'
      />
    </div>
  );
};

export default Input;
