import React from "react";
import ProductList from "../products/ProductList";
import Heading from "../layout/Heading";
import Jumbotron from "./Jumbotron";

function Home() {
  return (
    <>
      <Jumbotron />
      <Heading>Products</Heading>
      <div className="product__container">
        <ProductList />
      </div>
    </>
  );
}

export default Home;
