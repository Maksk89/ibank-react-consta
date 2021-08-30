import React, {useEffect, useState} from 'react';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import {getJSON} from '../../utils/http';
import Account from './Account/Account';

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await getJSON('/accounts'));
    } catch (e) {
      setData(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const handleRetry = async () => {
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return (
      <>
        <p>Произошла ошибка</p>
        <Button onClick={handleRetry}>Повторить попытку</Button>
      </>
    );
  }

  return (
    <>
      {data?.map((account) => <Account key={account?.id} item={account}/>)}
    </>
  );
};

Accounts.propTypes = {};

export default Accounts;
