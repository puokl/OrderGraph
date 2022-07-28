import axios from "axios";

axios.defaults.baseURL =
	process.env.REACT_APP_BASE_URL || "https://ordergraph-prod.herokuapp.com/";

export default axios;
