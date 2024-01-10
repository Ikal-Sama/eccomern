import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import banner from "../assets/banner.png";
import banner2 from "../assets/banner2.png";
import { Col, Row } from "react-bootstrap";
import categories from "../categories";
import "./Home.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img
        src={banner2}
        // style={{ backgroundSize: "cover", width: "100vw" }}
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        {/* last products */}
        <div className="d-flex justify-content-center flex-wrap">
          {Array.isArray(lastProducts) &&
            lastProducts.map((product) => <ProductPreview {...product} />)}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src={banner} style={{ backgroundSize: "cover", width: "100%" }} />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row className="mb-4">
          {categories.map((category) => {
            return (
              <LinkContainer
                to={`/category/${category.name.toLocaleLowerCase()}`}
              >
                <Col md={4}>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${category.img})`,
                      gap: "10px",
                    }}
                    className="category-tile"
                  >
                    {category.name}
                  </div>
                </Col>
              </LinkContainer>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
