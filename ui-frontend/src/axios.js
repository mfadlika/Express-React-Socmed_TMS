import axios from "axios";

const instance = axios.create({
  baseURL: "https://express-react-socmed-tms.vercel.app",
});

export default instance;
