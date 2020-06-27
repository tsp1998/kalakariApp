import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";
//css
import "./css/AddProduct.css";
import { generateBase64FromImage } from "../utils/image";

class AddProduct extends React.Component {
  state = {
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["RED", "GREEN", "YELLOW", "BLACK", "WHITE"],
    selectColors: [],
    selectedSizes: [],
    modal: false,
    image1: null,
    image2: null,
    image3: null,
    productName: "",
    price: null,
    description: null,
  };
  componentDidMount() {
    const { modalOpen } = this.props;
    this.setState({ modal: modalOpen });
    const formData = new FormData();
  }
  toggle = () => this.setState({ modal: !this.state.modal });
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 1; i <= 3; i++)
      formData.append(`images[]`, this.state[`image${i}`]);
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("description", this.state.description);
    formData.append("sizes", this.state.selectedSizes);
    formData.append("colors", this.state.selectColors);

    axios.post("/products/add", formData);
  };

  handleCheckBoxChange = (e) => {
    const { value } = e.target;
    const modifiedSelectedSizes = this.state.selectedSizes;
    const index = modifiedSelectedSizes.indexOf(value);
    if (index >= 0) {
      modifiedSelectedSizes.splice(index, 1);
    } else {
      modifiedSelectedSizes.push(value);
    }
    this.setState({ selectedSizes: modifiedSelectedSizes });
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => this.setState({ [name]: b64 }))
        .catch((err) => {
          this.setState({ [name]: null });
        });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSelectChange = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ selectColors: value });
  };

  render() {
    const { modal } = this.state;
    return (
      <div className="container">
        <form
          method="post"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <Modal isOpen={modal} toggle={this.toggle} className="my-modal">
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        onChange={this.handleChange}
                        value={this.state.productName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="productPrice">Product Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        onChange={this.handleChange}
                        value={this.state.price}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="productName">Available Sizes</label>
                      <br />
                      {this.state.sizes.map((size, index) => (
                        <>
                          <input
                            key={index}
                            className="checkbox"
                            type="checkbox"
                            value={size}
                            onChange={this.handleCheckBoxChange}
                          />
                          {size}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="productName">Available Colors</label>
                      <select
                        onChange={this.handleSelectChange}
                        name="selectColors"
                        className="form-control"
                        multiple
                      >
                        {this.state.colors.map((color, index) => (
                          <>
                            <option key={index} value={color}>
                              {color}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      cols="60"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="">Product Images</label>
                  <input
                    className="form-control"
                    accept="image/*"
                    type="file"
                    name="image1"
                    onChange={this.handleChange}
                  />
                  <input
                    className="form-control"
                    accept="image/*"
                    type="file"
                    name="image2"
                    onChange={this.handleChange}
                  />
                  <input
                    className="form-control"
                    accept="image/*"
                    type="file"
                    name="image3"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <input
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn-sm"
                color="primary"
                value="Add Product"
              />
              <Button
                className="btn-sm"
                color="secondary"
                onClick={this.toggle}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </form>
      </div>
    );
  }
}

export default AddProduct;
