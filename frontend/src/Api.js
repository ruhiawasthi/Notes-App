import axios from 'axios';
import env from 'react-dotenv';

export default axios.create({
  baseURL: env.BACKEND_URL
});