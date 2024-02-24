import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProducts = async() => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
}

const ProductList = () => {
    const {data: products, error, isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: retrieveProducts,
    })
    
    return (
        <div>
            Product List
        </div>
    );
};
export default ProductList;