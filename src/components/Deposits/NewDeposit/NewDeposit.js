import React, {useState} from 'react';
import {postJSON} from '../../../utils/http';
import PropTypes from 'prop-types';
import styles from './NewDeposit.module.css';
import Form from '../../../ui/Form/Form';
import Input from '../../../ui/Input/Input';
import {Loader} from '@consta/uikit/Loader';
import {IconAdd} from '@consta/uikit/IconAdd';
import {IconBackward} from '@consta/uikit/IconBackward';
import {IconCheck} from '@consta/uikit/IconCheck';
import {Button} from '@consta/uikit/Button';
import {Grid, GridItem} from '@consta/uikit/Grid';
import {Text} from '@consta/uikit/Text';
import {IconRestart} from '@consta/uikit/IconRestart';

const NewDeposit = (
  {
    onComplete,
  }
) => {
  const [deposits, setDeposits] = useState([
    {
      id: 1,
      title: '"150 лет надежности"',
      percent: 'До 5,25%',
    },
    {
      id: 2,
      title: '"Пополняемый"',
      percent: 'До 2,70%',
    },
    {
      id: 3,
      title: '"Управляемый"',
      percent: 'До 2,40%',
    },
  ]);

  //шаги по этапам
  const [step, setStep] = useState(1);
  //депозит
  const [deposit, setDeposit] = useState(null);

  //значения суммы и периода по умолчанию для формы
  const [amount, setAmount] = useState(500000);
  const [period, setPeriod] = useState(3);

//Значения для лоадера, ошибок и данных
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  /*===============FUNCTION=====================*/



  //============= FOR ONE STEPS==============

  //выбор депозита на первом шаге, переход к второму шагу
  const handleDepositSelect = (evt, deposit) => {
    setDeposit(deposit);
    setStep(2);
  };

  //============= FOR TWO STEPS==============

//изменение значения суммы из формы
  const handleAmountChange = (evt) => {
    const {value} = evt.target;
    setAmount(value);
  }
  // изменение значения периода из формы
  const handlePeriodChange = (evt) => {
    const {value} = evt.target;
    setPeriod(value);
  }

  //обработка данных из формы на втором шаге
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDeposit(deposit);
    //setStep(2);
  };

  // Функция возврата назад со второго шага
  const handleForwardDepositSelect = (evt, deposit) => {
    setDeposit(null);
    setStep(1);
  }

//============= FOR THIRD STEPS==============

  //закрытие окна на третьем шагу
  const handleClose = (evt) => {
    if (typeof onComplete !== 'function') {
      return;
    }
    onComplete();
  };


  /*===============END FUNCTION=====================*/



  /*================== STEPS ==================*/

  /*================== FIRST STEPS ==================
  =====================Выбор типа вклада============= */
  if (step === 1) {
    return (
      <div>
        <h3>Выберите вклад</h3>
        {deposits.map((deposit) => <div className={styles.container}
                                        key={deposit.id}
                                        onClick={(evt) => handleDepositSelect(evt, deposit)}
        >
          {deposit.title} - {deposit.percent}
        </div>)}
      </div>
    )
  }

  /*================== END FIRST STEPS ==================*/


  /*================== TWO STEPS ==================
форма ввода суммы и периода + возможность вернуться назад к выбору вкладов + проверка данных
============= */

  if (step === 2) {

    const dataJSON = {
      "depositId": deposit.id,
      "amount": Number(amount),
      "period": Number(period),
    };

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        setData(await postJSON('/deposits', dataJSON));
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

   /* useEffect(() => {
      loadData();
    }, []);*/

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
      return setStep(3);
    }

    return (
      <div data-testid="params">
        <h3>Открыть вклад {deposit.title}?</h3>
        <Form onSubmit={handleSubmit}>

          <Grid cols="2" gap="xl">
            <GridItem col="2">
          <Input name="amount" type="text" value={amount} onChange={handleAmountChange}/>
              </GridItem>
            <GridItem col="2">
          <Input name="period" type="text" value={period} onChange={handlePeriodChange}/>
            </GridItem>
            <GridItem col="2">
              <hr/>
              <Text weight="semibold" align="center">Деньги спишутся с существующего вклада</Text>
            </GridItem>

              <GridItem>
                <Text align="center">
          <Button iconLeft={IconBackward} label="Назад" onClick={handleForwardDepositSelect}/>
                </Text>
              </GridItem>
            <GridItem>
              <Text align="center">
          <Button iconLeft={IconAdd} label="Открыть" onClick={loadData}/>
              </Text>
              </GridItem>
          </Grid>

        </Form>
      </div>
    )


  }

  /*================== END TWO STEPS ==================*/


  /*================== THIRD STEPS ==================
Ответ готово
============= */

  if (step === 3) {
  //успешно
      return (
        <div data-testid="ok">
          <h3>{deposit.title}</h3>
          <p>Успешно</p>
          <Button iconLeft={IconCheck} label="Готово" onClick={handleClose}/>
        </div>
      )
  }

  /*================== END THIRD STEPS ==================*/


  /*================== END STEPS ==================*/


};

NewDeposit.propTypes = {
  onComplete: PropTypes.func,
};

export default NewDeposit;
