import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Form from '../../../ui/Form/Form';
import {Button} from '@consta/uikit/Button';
import Input from '../../../ui/Input/Input';

const initial = {
  id: 0,
  title: 'Дополнительный счёт',
  number: 'XXXXXXXXXXXXXXXXX77',
  balance: 777777.99
};

const EditAccount = ({
                       account = null,
                       onSave,
                     }) => {

  const [form, setForm] = useState({...initial});
  const ref = useRef();

  useEffect(() => {
    if (account === null) {
      return;
    }
    setForm({...account, number: `${account.number}`});
    ref.current?.focus();
  }, [account]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSave(evt, {
      ...form,
      title: String(form.title),
      number: String(form.number),
      balance: Number(form.balance),
    });
    setForm({...initial});
    ref.current?.focus();
  };


  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setForm((prevState) => ({...prevState, [name]: value}));
  };


  return (
    <Form onSubmit={handleSubmit}>
      <div>
        Название счета <Input name="title" value={form.title} ref={ref} onChange={handleChange}/>
      </div>
      <div>
        Номер счета <Input name="number" value={form.number} onChange={handleChange}/>
      </div>
      <div>
        Баланс <Input name="balance" value={form.balance} onChange={handleChange}/>
      </div>
      <Button label="Cохранить" role="submit"/>
      <br/><br/>
    </Form>
  );


};


EditAccount.propTypes = {
  account: PropTypes.shape({}),
  onSave: PropTypes.func,
};

export default EditAccount;
