import axios from "axios";
import * as process from "process";

// Gets basic data from the .env file
const NEXTJS_API_URL = process.env.NEXTJS_API_URL || "";

// Creates a new axios instance
const api = axios.create({
    baseURL: NEXTJS_API_URL,
})

export default api;
