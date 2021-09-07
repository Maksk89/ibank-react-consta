import React, {useState} from 'react';

//Конста
import {Button} from '@consta/uikit/Button';
import {Text} from '@consta/uikit/Text';
import styles from '../PollDeposit.module.css';
import PropTypes from 'prop-types';

const PollDepositOption = (
  {
    // onComplete,
    onClose,
  }
) => {

  const [stepPoll, setStepPoll] = useState(1);

  const [poll, setPoll] = useState(null);

  const [PollDeposits, setPollDeposits] = useState([
    {
      id: 1,
      problem: 'Вы ещё не клиент нашего банка?',
    },
    {
      id: 2,
      problem: 'Вы хотите положить на вклад большую сумму денег и "забыть"?',
    },
    {
      id: 3,
      problem: 'Вы хотите иметь возможность только пополнять вклад?',
    },
    {
      id: 4,
      problem: 'Вы хотите иметь возможность пополнять и выводить деньги?',
    },
  ]);


  const deposits = ([
    {
      id: 1,
      title: '"Акционный"',
      percent: 'До 6,0%',
    },
    {
      id: 2,
      title: '"150 лет надежности"',
      percent: 'До 5,25%',
    },
    {
      id: 3,
      title: '"Пополняемый"',
      percent: 'До 2,70%',
    },
    {
      id: 4,
      title: '"Управляемый"',
      percent: 'До 2,40%',
    },
  ]);

  const handleClose = (evt) => {
    /*  if (typeof onComplete !== 'function') {
        return;
      }*/
    //  onComplete();
    onClose();
  };


  const handlePollSelect = (evt, poll) => {
    setPoll(poll);
    setStepPoll(2);
  };

  if (stepPoll === 1) {
    return (
      <>
        <h3>Какие у Вас потребности?</h3>
        {PollDeposits.map((poll) =>
          <div className={styles.container}
               key={poll.id}
               onClick={(evt) => handlePollSelect(evt, poll)}
          >
            {poll.problem}
          </div>)
        }

        <Text align="center">
          <Button onClick={handleClose} label="Закрыть"/>
        </Text>

      </>
    );
  }

  if (stepPoll === 2) {

    //поиск в массиве
    let dep = deposits.find(item => item.id === poll.id);

    return (
      <>
        <h3>{poll.problem}</h3>
        <p>
          Мы рекомендуем вам выбрать вклад {dep.title}<br/>
          Процентная ставка {dep.percent}
        </p>

        <Text align="center">
          <Button onClick={handleClose} label="Закрыть"/>
        </Text>

      </>
    );

  }


};

PollDepositOption.propTypes = {
  //onComplete: PropTypes.func,
  onClose: PropTypes.func,
};

export default PollDepositOption;
