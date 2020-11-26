import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddProduct from './AddProduct';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  container: {
    background: 'white',
  },
  productItem: {
    marginRight: theme.spacing(1),
  },
  noItem: {
    marginBottom: theme.spacing(2),
  },
}));

const Purchase = ({
  products,
  allowedProducts,
  addProducts,
  isSearching,
  handleProductChange,
  deleteProducts,
  error,
  handleBlur,
}) => {
  const classes = useStyles();
  return (
    <div>
      <h2 className="text-primary">Purchase</h2>
      {isSearching ? (
        <div>Searching ...</div>
      ) : (
        <div>
          {allowedProducts && allowedProducts.length > 0 ? (
            <>
              {products &&
                products.map((product, index) => {
                  return (
                    <AddProduct
                      product={product}
                      key={product.id}
                      index={index}
                      allowedProducts={allowedProducts}
                      handleProductChange={handleProductChange}
                      deleteProducts={deleteProducts}
                      error={error}
                      handleBlur={handleBlur}
                    />
                  );
                })}
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={addProducts}
              >
                Add Product
              </Button>
            </>
          ) : (
            <div className={classes.noItem}>Please Enter valid Card number</div>
          )}
        </div>
      )}
    </div>
  );
};

Purchase.defaultProps = {};
Purchase.propTypes = {
  allowedProducts: PropTypes.array.isRequired,
  addProducts: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  handleProductChange: PropTypes.func.isRequired,
  deleteProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Purchase;
