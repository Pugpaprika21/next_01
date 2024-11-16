"use client";

import { clientLogger } from "@/app/utils/b2c/functions/clientLogger";
import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const handleSearchProducts = async (page = 1) => {
    setLoading(true);

    try {
      let url = "";
      if (searchQuery) {
        url = `https://fakestoreapi.com/products/${searchQuery}`;
      } else {
        url = `https://fakestoreapi.com/products?limit=${itemsPerPage}&offset=${
          (page - 1) * itemsPerPage
        }`;
      }

      const resp = await fetch(url);
      const result = await resp.json();

      //clientLogger("search_products", result);

      if (searchQuery && !Array.isArray(result)) {
        setProducts([result]);
        setTotalPages(1);
      } else if (Array.isArray(result)) {
        setProducts(result);
        const totalItems = 20;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lazyPage = parseInt(urlParams.get("lazy_page"), 10);

    if (lazyPage && !isNaN(lazyPage)) {
      setCurrentPage(lazyPage);
    } else {
      setCurrentPage(1);
    }
  }, []);

  useEffect(() => {
    handleSearchProducts(currentPage);
  }, [currentPage]);

  const updateUrlWithPage = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lazy_page", page);
    window.history.pushState({}, "", url);
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updateUrlWithPage(page);
    }
  };

  return (
    <div className="container">
      {/* Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
          handleSearchProducts(1);
          updateUrlWithPage(1);
        }}
        className="mb-3"
      >
        <label htmlFor="search" className="form-label">
          Search Products:
        </label>
        <div className="input-group">
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Product Table */}
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-secondary mx-1"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-secondary mx-1"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
