import React from "react";
import ProductForm from "./ProductForm";
import './ProductList.css';

class Product extends React.Component {
  state = { editMode: false, product: {...this.props} };

  handleDeleteClick = (e) => {
    this.props.handleDelete(this.props.id);
  }

  handleEditClick = (e) => {
    this.setState({ editMode: true });
  }

  cancelEdit = () => {
    this.setState({ editMode: false });
  }

	render() {
    const {name, picture, quantity, purchasePrice, sellingPrice} = this.state.product;
    if(this.state.editMode) {
      return (
        <ProductForm {...this.state.product} editMode={true} cancelEdit={this.cancelEdit} />   
      );
    }
		return (
      <div className="item">
        <div className="image">
          <img src={picture} alt=""/>
        </div>
        <div className="content">
          <a href="#0" className="header">{name}</a>
          <div className="meta">
            <span>Quantity: {quantity}</span>
          </div>
          <div className="description">
            <p></p>
          </div>
          <div className="extra">
            <div>Purchase Price: {purchasePrice}&#8362;</div>
            <div>Selling Price: {sellingPrice}&#8362;</div>
          </div>
        </div>
        <div className="buttons">
          <button className="ui compact labeled icon button edit" onClick={this.handleEditClick}>
            <i className="edit icon"></i>
            Edit
          </button>
          <button className="ui compact labeled icon button delete" onClick={this.handleDeleteClick}>
            <i className="trash alternate icon"></i>
            Delete
          </button>
        </div>
      </div>
		);
	}
}

export default Product;
