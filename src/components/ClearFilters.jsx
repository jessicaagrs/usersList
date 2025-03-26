import { CiRedo } from 'react-icons/ci';
import '../App.css';

const ClearFilters = ({ onClickInvisible }) => {
  const handleClickClearFilters = () => {
    const input = document.querySelector('input[name="search"]');
    const listCategorys = document.getElementById('listCategorys');
    input.value = '';
    input.focus();
    listCategorys.querySelectorAll('button').forEach(button => {
      button.classList.remove('active');
    });
    onClickInvisible();
  };

  return (
    <button
      className='buttonClear'
      onClick={handleClickClearFilters}
    >
      <CiRedo /> Clear all filters
    </button>
  );
};

export default ClearFilters;
