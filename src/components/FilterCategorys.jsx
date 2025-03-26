import '../App.css';

const FilterCategorys = ({ onClickSelectCategorys }) => {
  const handleClickSelectCategory = oEvent => {
    const { target } = oEvent;
    target.classList.toggle('active');

    const buttons = document.querySelectorAll('.listCategorys button');
    buttons.forEach(button => {
      if (button !== target) {
        button.classList.remove('active');
      }
    });

    onClickSelectCategorys(oEvent);
  };
  return (
    <ul
      className='listCategorys'
      id='listCategorys'
    >
      <li>
        <button
          className='listButton'
          onClick={handleClickSelectCategory}
        >
          Reputation
        </button>
      </li>
      <li>
        <button
          className='listButton'
          onClick={handleClickSelectCategory}
        >
          New users
        </button>
      </li>
      <li>
        <button
          className='listButton'
          onClick={handleClickSelectCategory}
        >
          Voters
        </button>
      </li>
      <li>
        <button
          className='listButton'
          onClick={handleClickSelectCategory}
        >
          Editors
        </button>
      </li>
      <li>
        <button
          className='listButton'
          onClick={handleClickSelectCategory}
        >
          Moderators
        </button>
      </li>
    </ul>
  );
};

export default FilterCategorys;
