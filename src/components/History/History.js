import React, {useEffect, useState} from 'react';
import {Loader} from '@consta/uikit/Loader';
import {rub} from '../../utils/format';
import {getJSON} from '../../utils/http';
import {Button} from '@consta/uikit/Button';
import {IconRestart} from '@consta/uikit/IconRestart';

const History = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await getJSON('/history'));
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
    return (
      <>
      <Loader/>
  </>
  );
  }

  if (error) {
    return (
      <>
        <div data-testid="error">
          <p>Произошла ошибка</p>
          <Button iconLeft={IconRestart} label="Повторить попытку" onClick={handleRetry}/>
        </div>
      </>
    );
  }

  if (!data.length) {
    return (
      <>
        <div data-testid="no-operations">За последнее время у вас не было операций</div>
      </>
    );
  }

  return (
    <>
      {data?.map((history) =>
        <div key={history?.id} data-testid="operation">
          <span data-testid="title">{(history?.title)}</span>
          <span data-testid="amount">{rub(history?.amount)}</span>
        </div>)}
    </>
  );
};

History.propTypes = {};

export default History;
