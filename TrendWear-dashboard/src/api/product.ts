import axios, { AxiosError } from 'axios';
import {Product} from "../types.ts";
import {data} from "autoprefixer";
import toast from "react-hot-toast";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:3003/api/v1/products/all');
        return response.data
    } catch (error) {
        console.error('Error fetching products:', (error as Error).message);
        return [];
    }
}

export const saveProduct = async (product:Product): Promise<String> => {
    try {
        const response = await axios.post<Product, any>('http://localhost:3003/api/v1/products/save', product);
        toast.success(response.data.message)
        return JSON.stringify({ message: response.data.message, data:data });
    } catch (error) {
        // Cast error to AxiosError to access response/data
        const axiosError = error as AxiosError;

        console.error("Error saving product:", axiosError.message);
        toast.error(axiosError.message)
        return JSON.stringify({ message: "Error saving product", data:axiosError.response?.data });
    }
};

export const updateProduct = async (product :Product): Promise<String> => {
    try {
        const response = await axios.patch<Product, any>('http://localhost:3003/api/v1/products/update', product);
        toast.success(response.data.message)
        return JSON.stringify({ message: response.data.message, data:data });
    } catch (error) {
        // Cast error to AxiosError to access response/data
        const axiosError = error as AxiosError;

        console.error("Error updating product:", axiosError.message);
        toast.error(axiosError.message)
        return JSON.stringify({ message: "Error updating product", data:axiosError.response?.data });

    }
};


export const deleteProduct = async (id:any): Promise<Product> => {
    try {
        const response = await axios.delete<Product, any>(`http://localhost:3003/api/v1/products/delete/${id}`);
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        // Cast error to AxiosError to access response/data
        const axiosError = error as AxiosError;

        console.error("Error deleting product:", error);
        toast.error(axiosError.message)
        throw error;
    }
};