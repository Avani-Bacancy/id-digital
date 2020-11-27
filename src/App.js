import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import _ from 'lodash';
import AddCard from './components/AddCard';
import Purchase from './components/Purchase';
import CheckOut from './components/CheckOut';
import Data from './data';

const initialBill = {
  subTotal: 0,
  total: 0,
};
function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardBalance, setCardBalance] = useState(0);
  const [allowedProducts, setAllowedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [bill, setBill] = useState(initialBill);
  const [error, setError] = useState({});

  const apiData = Data;

  const debounceSearch = useRef(
    _.debounce((cardNum) => {
      const foundCard =
        cardNum && apiData.find((data) => data.number === Number(cardNum));
      if (foundCard) {
        setCardBalance(foundCard.balance);
        setAllowedProducts(foundCard.allowedProducts);
      }
      setIsSearching(false);
    }, 200),
  );

  useEffect(() => {
    if (cardNumber) {
      setIsSearching(true);
      debounceSearch.current(cardNumber);
    } else {
      setAllowedProducts([]);
    }
  }, [cardNumber]);

  const addProducts = () => {
    setProducts([
      ...products,
      {
        id: '',
        name: '',
        qty: 1,
        price: '0',
      },
    ]);
  };
  const setProduct = (product, index) => {
    const data = [...products];
    data[index] = product;
    setProducts([...data]);
  };

  // to count bill
  useEffect(() => {
    const cost = { ...initialBill };
    if (products && products.length > 0) {
      products.forEach((product) => {
        cost.subTotal += product.price * Number(product.qty);
        if (product.discountCentsPerLitre) {
          cost.total +=
            product.price * product.qty -
            (product.discountCentsPerLitre / 100) * product.qty;
        }
        cost.total = cost.subTotal;
        if (cost.total > cardBalance) {
          setError({ ...error, total: true, index: 0 });
        }
      });
    } else if (cost.total > cardBalance) {
      setError({ ...error, total: true, index: 0 });
    }
    setBill({ ...cost });
  }, [products, error, cardBalance]);

  const handleProductChange = (name, value, index) => {
    let product = products[index];
    if (name === 'product') {
      product = allowedProducts.find((e) => e.id === value);
      product.qty = 1;
      product.price = 0;
      setProduct(product, index);
    } else {
      product[name] = value;
      setProduct(product, index);
    }
  };

  const handleBlur = (index) => {
    const product = products[index];
    if (
      product.price <= product.minPriceCents / 100 ||
      product.price >= product.maxPriceCents / 100
    ) {
      setError({ ...error, price: true, index });
    } else {
      setError({ price: false, index: -1 });
    }
  };

  const deleteProducts = (index) => {
    const data = [...products];
    data.splice(index, 1);
    setProducts([...data]);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      color="primary"
      className="main-container"
    >
      <Grid item md={5} xs={12} sm={12}>
        <Card>
          <CardContent>
            <AddCard cardNumber={cardNumber} setCardNumber={setCardNumber} />
            <Purchase
              allowedProducts={allowedProducts}
              addProducts={addProducts}
              isSearching={isSearching}
              products={products}
              handleProductChange={handleProductChange}
              deleteProducts={deleteProducts}
              error={error}
              handleBlur={handleBlur}
            />
            <CheckOut
              bill={bill}
              products={products}
              error={error}
              isBtnDisabled={!(cardBalance > 0 && cardBalance >= bill.total)}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
