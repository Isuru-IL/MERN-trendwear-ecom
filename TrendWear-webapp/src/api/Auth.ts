import axios from "axios";
import toast from "react-hot-toast";
import {Auth} from "../types";

export const saveRegister = async (Auth:Auth): Promise<boolean> => {
    try {
        const response = await axios.post<Auth, any>('http://localhost:3003/api/v1/auth/register', Auth);
        toast.success(response.data.message)
        localStorage.setItem("token",response.data.token)
        return true;
        // return JSON.stringify({ message: response.data.message, data:response.data});
    } catch (error) {
        // @ts-ignore
        if (error.response.status==401){
            // @ts-ignore
            toast.error(error.response.data.message)
        }
        // @ts-ignore
        console.error("Error creating account:", error.message);
        return false;
        // return JSON.stringify({ message: "Error creating account", data:error.message });

    }
};



export const saveLogin = async (Auth:Auth): Promise<boolean> => {
    try {
        const response = await axios.post<Auth, any>('http://localhost:3003/api/v1/auth/login', Auth);
        toast.success(response.data.message)
        localStorage.setItem("token",response.data.token)
        return true;
        // return JSON.stringify({ message: response.data.message, data:response.data });

    } catch (error) {
        // @ts-ignore
        if (error.response.status==401){
            // @ts-ignore
            toast.error(error.response.data.message)
        }
        // @ts-ignore
        console.error("Error login the user :", error.message);
        return false;
        // return JSON.stringify({ message: "Error login the user", data:error.response.data.message });
    }
};