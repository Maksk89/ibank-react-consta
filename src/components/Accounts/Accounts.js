import React, {useEffect, useState} from 'react';

//Конста
import {Loader} from '@consta/uikit/Loader';
import {Button} from '@consta/uikit/Button';
import {IconRestart} from '@consta/uikit/IconRestart';
import {Text} from '@consta/uikit/Text';
import {IconEdit} from '@consta/uikit/IconEdit';
import {IconClose} from '@consta/uikit/IconClose';
import {getJSON, postJSON} from '../../utils/http';
import Account from './Account/Account';
import EditAccount from './Account/EditAccount';

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [edited, setEdited] = useState(null);

  // для смены параметра передачи
  const method = 'GET';


  const loadData = async (account, method) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // в зависимости от параметра вызываем сохранение в post
      if (method === 'POST') {
        console.log('обновляем после удаления', JSON.stringify(account));
        setData( await postJSON('/accounts', account));
      }
      // если post не передан, то "забираем"
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

  const handleEdit = (evt, account) => {
    setEdited(account);
  };

  const handleSave = (evt, account) => {
    setEdited(null);
    if (account.id === 0) {
      setData((prevState) => [...prevState, {...account, id: Date.now()}]);
      loadData(account, 'POST');
      return;
    }
    setData((prevState) => prevState.map((o) => o.id !== account.id ? o : account));
    loadData(account, 'POST');
  };

  const handleRemove = (evt, account) => {
 setData((prevState) => prevState.filter((o) => o.id !== account.id));
    //loadData(account, 'POST');
    console.log('после удаление', JSON.stringify(account));
  };


  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return (
      <>
        <p>Произошла ошибка</p>
        <Button iconLeft={IconRestart} label="Повторить попытку" onClick={handleRetry}/>
      </>
    );
  }

  return (
    <>

      <hr/>
      <Text weight="semibold">Операции со счетами</Text>
      <hr/>

      <EditAccount account={edited} onSave={handleSave}/>

      {data?.map((account) =>

        <div id={account?.id}>

          <Button
            label="Удалить"
            view="ghost"
            iconLeft={IconClose}
            onlyIcon
            onClick={(evt) => handleRemove(evt, account)}
          />

          <Button
            label="Редактировать"
            view="ghost"
            iconLeft={IconEdit}
            onlyIcon
            onClick={(evt) => handleEdit(evt, account)}
          />

          <Account key={account?.id} item={account}/>


        </div>
      )
      }
    </>
  );
};

Accounts.propTypes = {
  // onWorkAccount: PropTypes.func,
};

export default Accounts;
