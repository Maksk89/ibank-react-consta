import React, {useState} from 'react';
import {IconRestart} from '@consta/uikit/IconRestart';
import {IconCheck} from '@consta/uikit/IconCheck';
import {IconQuestion} from '@consta/uikit/IconQuestion';
import {Button} from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';

//import ContextButton from '../../ui/ContextButton/ContextButton';
import {postJSON} from '../../utils/http';
//import Loader from '../../ui/Loader/Loader';

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

    const handleRetry = async () => {
      await loadData();
    };

  const handleClose = (evt) => {
    if (typeof onComplete !== 'function') {
      return;
    }
    onComplete();
  };

   /* useEffect(() => {
      loadData();
    }, []);*/


  if (error) {
    return (
      <>
        <div data-testid="error">
          <p>Произошла ошибка</p>
          <Button iconLeft={IconRestart} label="Повторить попытку" onClick={handleRetry}></Button>
        </div>
      </>
    );
  }

 if (loading) {
    return (
      <>
        <div data-testid="loading">
          <Loader/>
        </div>
      </>
    );
  }


  if (data?.status === "ok") {
    return (
      <>
        <div data-testid="ok">
          <p>Программа успешно подключена</p>
          <Button iconLeft={IconCheck} label="OK" onClick={handleClose}></Button>
        </div>
      </>
    );
  }


  return (
    <>
      <div data-testid="participate">
        <p>Будет подключена программа кешбек.</p>
        <Button iconLeft={IconQuestion} label="Подключить" onClick={handleRetry}></Button>
      </div>
    </>
  );

};

export default ParticipateBonuses;
