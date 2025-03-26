import { useEffect, useState } from 'react';
import Input from './components/Input';
import ClearFilters from './components/ClearFilters';
import FilterCategorys from './components/FilterCategorys';
import Card from './components/Card';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import './App.css';

const getDateToday = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

const App = () => {
  const [data, setData] = useState([]);
  const [isViewButtonClear, setIsViewButtonClear] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (category = null, fullName = null) => {
    try {
      setLoading(true);
      let url = 'https://my.api.mockaroo.com/usersFigma.json?key=6c5586a0';
      if (category) {
        if (category === 'New users') {
          const createdAt = getDateToday();
          url = `https://my.api.mockaroo.com/byCategory/usersFigma.json?key=6c5586a0&createdAt=${createdAt}`;
        } else {
          url = `https://my.api.mockaroo.com/byCategory/usersFigma.json?key=6c5586a0&category=${category}`;
        }
      }

      if (fullName)
        url = `https://my.api.mockaroo.com/byFullName/usersFigma.json?key=6c5586a0&fullName=${fullName}`;

      const result = await fetch(url);

      if (!result.ok) {
        throw new Error(
          `Erro na requisição: ${result.status} - ${result.statusText}`
        );
      }
      const data = await result.json();

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = oEvent => {
    const { value } = oEvent.target;
    fetchUsers(null, value);
    setIsViewButtonClear(true);
  };

  const handleClickSelectCategory = oEvent => {
    const value = oEvent.target.textContent;
    fetchUsers(value);
    setIsViewButtonClear(true);
  };

  const handleClickSetInvisible = () => {
    setIsViewButtonClear(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [setData]);

  return (
    <>
      <h1 className='titlePage'>Users</h1>
      <div className='containerSearch'>
        <Input onChange={handleSearch} />
        <FilterCategorys onClickSelectCategorys={handleClickSelectCategory} />
      </div>
      {isViewButtonClear && (
        <ClearFilters onClickInvisible={handleClickSetInvisible} />
      )}
      {loading && <Loading />}
      {error && !loading && <ErrorMessage>{error.message}</ErrorMessage>}
      {data.length > 0 && (
        <div className='containerCard'>
          {data.map(user => (
            <Card
              key={user.id}
              {...user}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
