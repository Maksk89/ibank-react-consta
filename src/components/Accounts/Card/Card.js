import React from 'react';
import {Text} from '@consta/uikit/Text';
import PropTypes from 'prop-types';

const Card = ({item}) => {
  return (
    <div>
     <Text fontStyle="italic">({item?.type})</Text>
      {item?.title}&nbsp;
      {item?.number}
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default Card;
