import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../constants/Api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ProductTag from "../products/ProductTag";

function Detail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = API + "/" + id;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(url);
          setProduct(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

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

  //if product has a category/tag, add a tag to the product image
  let tagString;

  if (product.categories.length === 0) {
    tagString = "";
  } else {
    tagString = product.categories[0].name;
  }

  return (
    <>
      <Row className="product-detail__breadcrumb">
        <Breadcrumb className="product-detail__breadcrumb-nav">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="justify-content-center product-detail__container">
        <Col sm={12} md={6} className="product-detail__img-container">
          <ProductTag>{tagString}</ProductTag>
          <img
            src={product.images[0].thumbnail}
            alt={product.name}
            className="product-detail__img"
          />
        </Col>
        <Col sm={12} md={6} className="product-detail__text-container">
          <div>
            <h1 className="product-detail__title">{product.name}</h1>
            <h2 className="product-detail__price">${product.prices.price}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: `${product.description}` }}
            ></div>
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} className="product-detail__icon" />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Detail;
