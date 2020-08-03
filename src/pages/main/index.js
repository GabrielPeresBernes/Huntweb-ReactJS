import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alerts } from '../../utils';
import { api } from "../../services";

import "./styles.css";

let currentPage = 1;

function Main() {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?page=${currentPage}`);
      const { docs, ...info } = response.data;
      setProducts(docs);
      setProductInfo(info);
    } catch (error) {
      alerts(error);
    }
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    currentPage -= 1;
    loadProducts();
  };

  const nextPage = () => {
    if (currentPage === productInfo.pages) return;
    currentPage += 1;
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Link id="btnCreate" to="/products/create">
        Registrar Produto
      </Link>
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong> {product.title} </strong>
            <p> {product.description} </p>
            <Link to={`/products/${product._id}`}> Acessar </Link>
          </article>
        ))}
        <div className="actions">
          <button 
          className="action" 
          disabled={currentPage === 1} 
          onClick={prevPage}
          >
            {"< Anterior"}
          </button>
          <span>
            {productInfo.page} / {productInfo.pages}
          </span>
          <button
            className="action" 
            disabled={currentPage === productInfo.pages}
            onClick={nextPage}
          >
            {"Próximo >"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
