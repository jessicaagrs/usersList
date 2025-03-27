import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import ClearFilters from './components/ClearFilters';
import ErrorMessage from './components/ErrorMessage';
import FilterCategorys from './components/FilterCategorys';
import Input from './components/Input';
import Loading from './components/Loading';
import {
  filterCategorys,
  filterFullName,
  filterNewUsers,
} from './utils/formatter';

const CATEGORIES = {
  REPUTATION: 'Reputation',
  NEW_USERS: 'New users',
  VOTERS: 'Voters',
  EDITORS: 'Editors',
  MODERATORS: 'Moderators',
};

const App = () => {
  const [data, setData] = useState([]);
  const [isViewButtonClear, setIsViewButtonClear] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (category = null, fullName = null) => {
    try {
      setLoading(true);
      let url = 'https://api.npoint.io/ff336f3dc8d871a81d27';
      const result = await fetch(url);

      if (!result.ok) {
        throw new Error(
          `Erro na requisição: ${result.status} - ${result.statusText}. Tente novamente mais tarde.`
        );
      }

      let data = await result.json();

      if (category && category !== CATEGORIES.NEW_USERS)
        data = filterCategorys(category, data);
      else data = filterNewUsers(data);

      if (fullName) data = filterFullName(fullName, data);

      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
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
      {data.length > 0 && !loading && (
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
