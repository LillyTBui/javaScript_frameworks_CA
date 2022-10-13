import { useState, useEffect } from "react";
import { API } from "../../constants/Api";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(API);
        setProducts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">An error occured: {error}</Alert>;
  }

  return (
    <>
      {products.map(function (product) {
        const { id, name, prices } = product;
        const image_url = product.images[0].thumbnail;
        return (
          <ProductItem
            key={id}
            id={id}
            name={name}
            image_url={image_url}
            price={Number(prices.price)}
          />
        );
      })}
    </>
  );
}

export default ProductList;
