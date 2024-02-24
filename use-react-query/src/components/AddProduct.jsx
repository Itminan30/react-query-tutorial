import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Axios Function || mutationFn
const addProduct = (newProduct) => {
    axios.post("http://localhost:3000/products", newProduct);
}

const AddProduct = () => {
    const [state, setState] = useState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: "",
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data, variables, context) => { // The data is the same data passed when mutation.mutate is called. The variables are the variables used for the post method. The context is the return of the onMutate.
            console.log({ context }, { data }, { variables });
            queryClient.setQueryData(["random"], { value: "Some Random Data in Cache" }); // Hardcode some data in cache
            queryClient.invalidateQueries("products"); // Reload the data in cache
        },
        onMutate: (variables) => { // This is always called before executing the mutationFn
            return { greeting: "Say Hello", variables }
        }
    })

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
        const newState = { ...state, id: crypto.randomUUID().toString() };
        mutation.mutate(newState);
    }

    if (mutation.isLoading) {
        return <span>Submitting...</span>
    }
    if (mutation.isError) {
        return <span>Error: {mutation.error.message}</span>
    }
    return (
        <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
            <h2 className="text-2xl my-2">Add a Product</h2>
            {mutation.isSuccess && <p>Product Added!</p>}
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