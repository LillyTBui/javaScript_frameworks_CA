import { Link } from "react-router-dom";

function Jumbotron() {
  return (
    <div className="jumbotron">
      <img src="/images/jumbotron.jpg" alt="" className="jumbotron__img" />
      <div className="jumbotron__text-div">
        <h2 className="jumbotron__text-title">Chanel makeup set</h2>
        <h3 className="jumbotron__text-subtitle">New arrival</h3>
        <Link to={`detail/25`}>
          <p className="jumbotron__text-btn">Shop</p>
        </Link>
      </div>
    </div>
  );
}

export default Jumbotron;
