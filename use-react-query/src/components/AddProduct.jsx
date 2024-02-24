import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
    const [state, setState] = useState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: "",
    });

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.type === "number" ? event.target.valueAsNumber : event.target.value;
        setState({
            ...state,
            [name]: value
        })
    }

    const submitData = (event) => {
        event.preventDefault();
    }
    return (
        <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
            <h2 className="text-2xl my-2">Add a Product</h2>
            {/* {mutation.isSuccess && <p>Product Added!</p>} */}
            <form className="flex flex-col" onSubmit={submitData}>
                <input
                    type="text"
                    value={state.title}
                    name="title"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product title"
                />
                <textarea
                    value={state.description}
                    name="description"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product description"
                />

                <input
                    type="number"
                    value={state.price}
                    name="price"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product price"
                />
                <input
                    type="text"
                    value={state.thumbnail}
                    name="thumbnail"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product thumbnail URL"
                />

                <button
                    type="submit"
                    className="bg-black m-auto text-white text-xl p-1 rounded-md"
                >
                    Add
                </button>
            </form>
        </div>
    );
};
export default AddProduct;