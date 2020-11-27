import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#F5F5F5',
    boxShadow: 'none',
  },
  container: {
    background: '#F5F5F5',
  },
  right: {
    textAlign: 'right',
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  error: {
    color: 'red',
  },
}));

const CheckOut = ({ bill, products, error, isBtnDisabled }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" className="text-primary">
          Checkout
        </Typography>
        <Grid container className={classes.container}>
          <Grid item sm={8}>
            SubTotal
          </Grid>
          <Grid item sm={3} className={classes.right}>
            {`$ ${bill.subTotal}`}
          </Grid>
          {products &&
            products.map((product) => {
              return (
                product.discountCentsPerLitre && (
                  <>
                    <Grid item sm={8}>
                      {product.name}
                    </Grid>
                    <Grid item sm={3} className={classes.right}>
                      {`- $ ${product.discountCentsPerLitre / 100}`}
                    </Grid>
                  </>
                )
              );
            })}
          <Grid item sm={8}>
            Total to Tendet
          </Grid>
          <Grid item sm={3} className={classes.right}>
            {`$ ${bill.total}`}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isBtnDisabled}
        >
          PROCESS NOW
        </Button>
        <FormHelperText className={classes.error}>
          {error.total ? 'Total is greater than card balence' : ''}
        </FormHelperText>
      </CardContent>
    </Card>
  );
};

CheckOut.defaultProps = {};
CheckOut.propTypes = {
  bill: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
};
export default CheckOut;
