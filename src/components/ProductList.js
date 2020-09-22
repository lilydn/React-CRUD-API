import React from "react";
import myItemsApi from "../api/myItemsApi";
import ProductForm from "./ProductForm";
import Product from "./Product";
import "./ProductList.css";

class ProductList extends React.Component {
	state = { data: [], displayedItems: [], isLoading: true };

	async componentDidMount() {
		let resultArr = [];
		try {
			const response = await myItemsApi.get(`/products`);
			resultArr = response.data;
		} catch (error) {
			console.error(error);
		}
		this.setState({
			data: resultArr,
			displayedItems: resultArr,
			isLoading: false,
		});
	}

	deleteProduct = async (id) => {
    console.log('delete invoked!');
		try {
			const response = await myItemsApi.delete(`/products/${id}`);
			if (response.status === 200) {
				let resultArr = this.state.displayedItems.filter(
					(item) => item.id !== id
				);
				this.setState({
					data: resultArr,
					displayedItems: resultArr,
					isLoading: false,
				}); 
			}
		} catch (error) {
			console.error(error);
		}
	};

	updateProduct = async (id, updatedProduct) => {
    console.log('update invoked!');
    this.setState({isLoading: true});
		try {
			const response = await myItemsApi.put(`/products/${id}`, updatedProduct);
			if (response.status === 200) {
				let resultArr = this.state.displayedItems;
				let ind = resultArr.findIndex((item) => item.id === id);
				ind !== -1
					? resultArr.splice(ind, 1, updatedProduct)
					: new Error("item id not found");
				this.setState({
					data: resultArr,
					displayedItems: resultArr,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	createNewProduct = async (newProduct) => {
    console.log('create invoked!');
    this.setState({isLoading: true});
		try {
			const response = await myItemsApi.post(`/products/`, newProduct);
			if (response.status === 201) {
				let resultArr = [...this.state.displayedItems, response.data];
				this.setState({
					data: resultArr,
					displayedItems: resultArr,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	render() {
    console.log(this.state.data);
		if (this.state.isLoading) {
			return <div className="ui active centered inline loader"></div>;
		}
		return (
			<div className="product-list">
				<ProductForm editMode={false} handleCreate={this.createNewProduct} />
				<div className="ui items">
					{this.state.displayedItems.map((item) => {
						return (
							<Product
                handleDelete={this.deleteProduct}
                handleUpdate={this.updateProduct}
								key={item.id}
                {...item}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ProductList;
