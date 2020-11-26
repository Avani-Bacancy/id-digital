import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, TextField } from '@material-ui/core';

const AddCard = ({ cardNumber, setCardNumber }) => {
  return (
    <Card>
      <CardContent>
        <TextField
          id="card-number"
          label="Card Number"
          required
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

AddCard.defaultProps = {};
AddCard.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  setCardNumber: PropTypes.func.isRequired,
};

export default AddCard;
