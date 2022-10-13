import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

function ProductItem({ id, image_url, name, price }) {
  return (
    <Link to={`detail/${id}`} key={id} className="card__link">
      <Card style={{ width: "14rem" }} className="card__container">
        <Card.Img variant="top" src={image_url} className="card__img" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

ProductItem.propTypes = {
  id: PropTypes.number,
  image_url: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

export default ProductItem;
