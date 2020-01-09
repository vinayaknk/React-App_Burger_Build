import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://react-burger-60fd2.firebaseio.com/"
});

export default instance;
