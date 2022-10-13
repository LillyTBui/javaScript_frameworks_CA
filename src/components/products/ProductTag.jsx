import React from "react";

function ProductTag({ children }) {
  if (children) {
    return (
      <div className="product-detail__tag-container">
        <span>{children}</span>
      </div>
    );
  }
}

export default ProductTag;
