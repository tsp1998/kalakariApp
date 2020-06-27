import React, { useState } from "react";

//components
import AddProduct from "../components/AddProduct";

function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Add Product
            </button>
            <AddProduct modalOpen={modalOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
