import React, {useState} from 'react';

//Конста
import {Modal} from '@consta/uikit/Modal';
import {Button} from '@consta/uikit/Button';
import {IconList} from '@consta/uikit/IconList';
import {IconInfo} from '@consta/uikit/IconInfo';
import {IconClose} from '@consta/uikit/IconClose';
import {Text} from '@consta/uikit/Text';
import {Tag} from '@consta/uikit/Tag';
import styles from './PollDeposit.module.css';
import PollDepositOption from './PollDepositOption/PollDepositOption';

const PollDeposit = () => {


  //const [stepPoll, setStepPoll] = useState(1);
  const [pollModalOpen, setPollModalOpen] = useState(false);

  const handlePollDeposit = () => {
    setPollModalOpen(true);
  };
  const handlePollDepositModalClose = () => {
    setPollModalOpen(false);
  };
  const handlePollDepositComplete = () => {
    setPollModalOpen(false);
  };


  return (
    <>
      <p>
        <Text weight="semibold">Вы не знаете какой вклад Вам подойдет?
          <Tag icon={IconInfo} label="Опрос"/>
        </Text>
      </p>
      <Button iconLeft={IconList} onClick={handlePollDeposit} label="Подобрать вклад"/>

      <Modal
        isOpen={pollModalOpen}
        isClose={handlePollDepositModalClose}
        hasOverlay
        onOverlayClick={handlePollDepositModalClose}
        className={styles.ModalPoll}
      >

        <Text align="right">
          <Button label="Закрыть" onClick={handlePollDepositModalClose} view="ghost" iconLeft={IconClose} onlyIcon/>
        </Text>

<PollDepositOption onClose={handlePollDepositComplete}/>


      </Modal>

    </>
  );
};

PollDeposit.propTypes = {};
export default PollDeposit;
