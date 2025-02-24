import axios from 'axios';

const baseUrl = 'http://localhost:3001/hits';

const getAll = () =>
  axios.get(baseUrl).then(response => response.data);

const create = newCompany =>
  axios.post(baseUrl, newCompany).then(response => response.data);

const remove = id =>
  axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, remove };
