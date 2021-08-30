import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {postJSON} from '../../utils/http';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';

const ParticipateBonuses = (
  {
    onComplete,
  }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await postJSON('/cashback'));
    } catch (e) {
      setData(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    await loadData();
  };

  const handleRetry = async () => {
    await loadData();
  };

  const handleComplete = () => {
    onComplete();
  }

  if (loading) {
    return (
      <div data-testid="loading">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error">
        <p>Произошла ошибка</p>
        <Button onClick={handleRetry}>Повторить попытку</Button>
      </div>
    );
  }

  if (data) {
    return (
      <div data-testid="ok">
        <p>Программа успешно подключена</p>
        <Button onClick={handleComplete}>Ok</Button>
      </div>
    );
  }

  return (
    <div data-testid="participate">
      <p>Будет подключена программа кешбек</p>
      <Button onClick={handleClick}>Подключить</Button>
    </div>
  );
};

ParticipateBonuses.propTypes = {
  onComplete: PropTypes.func,
};

export default ParticipateBonuses;
