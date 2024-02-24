import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
}

const ProductList = () => {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: retrieveProducts,
    })

    if (isLoading) return <div>Fetching Products Data...</div>
    if (error) return <div>An error occured in ProductList: {error.message}</div>
    console.log(products);
    return (
        <div className="flex flex-col justify-center items-center w-3/5">
            <h2 className="text-3xl my-2">Product List</h2>
            <ul className="flex flex-wrap justify-center items-center" >
                {products && products.map(product => (
                    <li
                        key={product.id}
                        className="flex flex-col items-center m-2 border rounded-sm"
                    >
                        <img
                            className="object-cover h-64 w-96 rounded-sm"
                            src={product.thumbnail}
                            alt={product.title} />
                        <p className="text-xl my-3">{product.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ProductList;