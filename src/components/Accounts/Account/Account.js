import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import {Text} from '@consta/uikit/Text';

const Account = ({item}) => {
  return (
    <div>
      <Text weight="bold">{item?.title}</Text>
      Номер счета: {item?.number}<br/>
      <Text view="brand">Баланс: {item?.balance}</Text>
      {item?.cards?.map((card) => <Card key={card.id} item={card}/>)}
      <hr/>
    </div>
  );

};

Account.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    cards: PropTypes.array,
  }),
};

export default Account;
