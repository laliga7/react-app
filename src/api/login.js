import axios from 'axios';
const url = "https://crud-react-test-app.herokuapp.com/users";
export const findUser = (id) => axios.get(`${url}/${id}`)