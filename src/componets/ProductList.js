// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import productsData from "../data"; // importing mock product data
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating fetching data
    setProducts(productsData);
  }, []);

  return (
    <div className="container mt-4" id="all-product">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text text-primary">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
