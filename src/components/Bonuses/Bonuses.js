import React, {useEffect, useState} from 'react';
import {rub} from '../../utils/format';
import {getJSON} from '../../utils/http';

//импорт подключение программы кешбек
import ParticipateBonuses from '../ParticipateBonuses/ParticipateBonuses'
import styles from '../../pages/Dashboard/Dashboard.module.css';

//Consta
import {IconRestart} from '@consta/uikit/IconRestart';
import {IconQuestion} from '@consta/uikit/IconQuestion';
import {Button} from '@consta/uikit/Button';
import {Loader} from '@consta/uikit/Loader';
import {Modal} from '@consta/uikit/Modal';


//import styles from './Bonuses.module.css';
//import Modal from '../../ui/Modal/Modal';


const Bonuses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [participateModalOpen, setParticipateModalOpen] = useState(false);


  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setParticipateModalOpen(false);
    try {
      setData(await getJSON('/cashback'));
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
  const handleParticipate = () => {
    setParticipateModalOpen(true);
  };
  const handleParticipateModalClose = () => {
    setParticipateModalOpen(false);
  };

  const handleParticipateComplete = () => {
    setParticipateModalOpen(false);
    loadData();
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
        <Button iconLeft={IconRestart} label="Повторить попытку" onClick={handleRetry}/>
      </>
    );
  }

  if (data.participating === false) {
    return (
      <>
        <p>У вас не подключен кешбек</p>
        <Button iconLeft={IconQuestion} label="Подключить" onClick={handleParticipate}/>

        {participateModalOpen && <Modal className={styles.modalCustom}
          isOpen={participateModalOpen}>
          <ParticipateBonuses onComplete={handleParticipateComplete}/>
        </Modal>
        }

      </>
    );
  }

  return (
    <>
      <p className={styles.cashback}>Cashback: {rub(data?.balance)}</p>
    </>
  );
};

Bonuses.propTypes = {};

export default Bonuses;
