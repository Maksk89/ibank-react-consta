import React, {useEffect, useState} from 'react';
import {rubMod, rub} from '../../utils/format';
import {getJSON} from '../../utils/http';
import styles from './Bonuses.module.css';
import ParticipateBonuses from '../ParticipateBonuses/ParticipateBonuses';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { Modal } from '@consta/uikit/Modal';

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
  const handleParticipateBonusesComplete = () => {
    setParticipateModalOpen(false);
    loadData();
  }

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

  if (data.participating === false) {
    return (
      <>
        <p>У вас не подключен кешбек</p>
        <Button onClick={handleParticipate}>Подключить</Button>
        {participateModalOpen && <Modal onClose={handleParticipateModalClose}>
          <ParticipateBonuses onComplete={handleParticipateBonusesComplete}/>
        </Modal>
        }
      </>
    );
  }

  return (
    <>
      <p className={styles.cashback}>Cashback: {rubMod(data?.balance)}</p>
    </>
  );
};

Bonuses.propTypes = {};

export default Bonuses;
