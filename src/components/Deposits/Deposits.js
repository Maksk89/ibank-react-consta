import React, {useEffect, useState} from 'react';

//Конста

import {Modal} from '@consta/uikit/Modal';
import {Loader} from '@consta/uikit/Loader';
import {Button} from '@consta/uikit/Button';
import {IconRestart} from '@consta/uikit/IconRestart';
import {IconAdd} from '@consta/uikit/IconAdd';
import {Text} from '@consta/uikit/Text';

import NewDeposit from './NewDeposit/NewDeposit';
import {getJSON} from '../../utils/http';
import {rub} from '../../utils/format';

import styles from './Deposits.module.css';
import {IconClose} from '@consta/uikit/IconClose';
import {Tag} from '@consta/uikit/Tag';
import {IconOpenInNew} from '@consta/uikit/IconOpenInNew';

const Deposits = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [newDepositModalOpen, setNewDepositModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setNewDepositModalOpen(false);
    try {
      setData(await getJSON('/deposits'));
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

  const handleNewDeposit = () => {
    setNewDepositModalOpen(true);
  };
  const handleNewDepositModalClose = () => {
    setNewDepositModalOpen(false);
  };
  const handleNewDepositComplete = () => {
    setNewDepositModalOpen(false);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return(
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


  return (
    <>
      <p>
        <Text weight="semibold">Ваши вклады
        </Text><br/>

      {data?.map((deposits) =>
        <div key={deposits?.id} data-testid="deposit">
          <Text weight="bold"><span data-testid="title">{(deposits?.title)}</span></Text>
          <span data-testid="finish">До {(deposits?.finish)}</span>
          <Text view="brand">Баланс: <span data-testid="balance">{rub(deposits?.balance)}</span></Text>
        </div>)}
    </p>
<hr/>
      <Text weight="semibold">Открыть вклад?
        <Tag icon={IconOpenInNew} label="Новый вклад"/>
      </Text>
      <Button iconLeft={IconAdd} label="Открыть вклад" onClick={handleNewDeposit}/>

      {newDepositModalOpen &&
      <Modal className={styles.modalCustom}
             isOpen={newDepositModalOpen}
             onClose={handleNewDepositModalClose}
             hasOverlay
             onOverlayClick={handleNewDepositModalClose}
      >
        <Text align="right">
          <Button label="Закрыть" onClick={handleNewDepositModalClose} view="ghost" iconLeft={IconClose} onlyIcon/>
        </Text>

        <NewDeposit onComplete={handleNewDepositComplete}/>

      </Modal>}

      </>
  );



        };

Deposits.propTypes = {};

export default Deposits;
