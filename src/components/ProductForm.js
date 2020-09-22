import React from "react";
import "./ProductForm.css";

class ProductForm extends React.Component {
	state = {
		name: "",
		picture: "",
		quantity: "",
		purchasePrice: "",
		sellingPrice: "",
		err: "",
	};

  // if we are creating a new item, initial inputs are empty 
  // if we are on edit mode, we want the existing data to appear
	componentDidMount = () => {
		if (this.props.editMode) {
			this.setState({ ...this.props });
		}
	};

	// an image url from the web starts with http:// or https:// but doesnt have to end with a file type
	// local images have to end with valid file type
	validateInput = (e) => {
    const { name, picture, quantity, purchasePrice, sellingPrice } = this.state;
    // input validation
		name.length < 3
			? this.setState({ err: "A name must be at least 3 characters long." })
			: typeof picture !== "string" ||
			  (!picture.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi) &&
					!picture.startsWith("http://") && !picture.startsWith("https://"))
			? this.setState({ err: "Image url must be a valid image url." })
			: !quantity.toString().match(/^(0|[1-9]\d*)$/)
			? this.setState({ err: "The quantity must be a positive integer." })
			: !purchasePrice.toString().match(/^(\d*\.)?\d+$/) ||
			  !sellingPrice.toString().match(/^(\d*\.)?\d+$/)
			? this.setState({ err: "A price must be a positive decimal number." })
      : this.setState({ err: "" }, () => { this.invokeApiMethods() }); // if input is valid - take action
  };

  invokeApiMethods = () => {
    let { id, name, picture, quantity, purchasePrice, sellingPrice} = this.state; 
    purchasePrice = (Math.round((parseFloat(purchasePrice)) * 100) / 100).toFixed(2);
    sellingPrice = (Math.round((parseFloat(sellingPrice)) * 100) / 100).toFixed(2);
    this.props.editMode 
    ? this.props.handleUpdate(id, { id, name, picture, quantity, purchasePrice, sellingPrice})
    : this.props.handleCreate({ id, name, picture, quantity, purchasePrice, sellingPrice });
  }
  

  // Product component will re-render 
	cancelUpdate = () => {
		this.props.cancelEdit();
	};

	renderCancelButton = () => {
		if (this.props.editMode) {
			return (
				<button className="ui compact button" onClick={this.cancelUpdate}>
					Cancel
				</button>
			);
		}
	};

	render() {
		const isEditMode = this.props.editMode;
		return (
			<div className="form-container">
				<div className="ui equal width form">
					<div className="fields">
						<div className="field">
							<input
								type="text"
								placeholder="Product Name"
								value={this.state.name}
								onChange={(e) => this.setState({ name: e.target.value })}
							/>
						</div>
						<div className="field">
							<input
								type="text"
								placeholder="Image Url"
								value={this.state.picture}
								onChange={(e) => this.setState({ picture: e.target.value })}
							/>
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<input
								type="number"
								placeholder="Quantity"
								value={this.state.quantity}
								onChange={(e) => this.setState({ quantity: e.target.value })}
							/>
						</div>
						<div className="field">
							<input
								type="number"
								placeholder="Purchase Price &#8362;"
								value={this.state.purchasePrice}
								onChange={(e) =>
									this.setState({ purchasePrice: e.target.value })
								}
							/>
						</div>
						<div className="field">
							<input
								type="number"
								placeholder="Selling Price &#8362;"
								value={this.state.sellingPrice}
								onChange={(e) =>
									this.setState({ sellingPrice: e.target.value })
								}
							/>
						</div>
					</div>
					<label className="err-label">{this.state.err}</label>
					<div className="form-buttons">
						<button
							className="ui compact primary button"
							onClick={this.validateInput}
						>
							{isEditMode ? "Update item" : "Add new item"}
						</button>
						{this.renderCancelButton()}
					</div>
				</div>
			</div>
		);
	}
}

export default ProductForm;
