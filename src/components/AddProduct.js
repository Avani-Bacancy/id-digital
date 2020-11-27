/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  container: {
    background: 'white',
  },
  productItem: {
    marginRight: theme.spacing(1),
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    background: 'red',
    borderRadius: '50%',
    color: 'white',
  },
  formControl: {
    width: '100%',
  },
  error: {
    color: 'red',
  },
}));

const AddProduct = ({
  product,
  allowedProducts,
  index,
  handleProductChange,
  deleteProducts,
  error,
  handleBlur,
}) => {
  const classes = useStyles();
  return (
    <Card key={product.id} className={classes.card}>
      <CardContent>
        <Grid container className={classes.container}>
          <Grid item md={4} xs={12} sm={12} className={classes.productItem}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="product"
                required
                value={product.id}
                onChange={(e) =>
                  handleProductChange('product', e.target.value, index)
                }
              >
                {allowedProducts &&
                  allowedProducts.map((allowedProduct) => {
                    return (
                      <MenuItem
                        value={allowedProduct.id}
                        key={allowedProduct.id}
                      >
                        {allowedProduct.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
            <TextField
              id="qty"
              label="Qty/Liter"
              required
              value={product.qty}
              onChange={(e) =>
                handleProductChange('qty', e.target.value, index)
              }
            />
          </Grid>
          <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
            <TextField
              id="price"
              label="Unit Price/$"
              required
              value={product.price}
              onChange={(e) =>
                handleProductChange('price', e.target.value, index)
              }
              onBlur={() => handleBlur(index)}
            />
            {error.price &&
              (error.index === index ? (
                <FormHelperText className={classes.error}>
                  {`Unit Price should be between ${
                    product.minPriceCents / 100
                  } and ${product.maxPriceCents / 100}`}
                </FormHelperText>
              ) : (
                ''
              ))}
          </Grid>
          <Grid item md={1} xs={12} sm={12} className={classes.iconContainer}>
            <RemoveIcon
              className={classes.removeIcon}
              onClick={() => deleteProducts(index)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AddProduct.defaultProps = {};
AddProduct.propTypes = {
  product: PropTypes.object.isRequired,
  allowedProducts: PropTypes.array.isRequired,
  handleProductChange: PropTypes.func.isRequired,
  deleteProducts: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default AddProduct;
