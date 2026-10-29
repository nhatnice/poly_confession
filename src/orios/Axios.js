import Config from './config';
import axios from 'axios';
import { toast } from 'react-toastify';

class Axios {
  static async post(url, data, headers) {
    const response = await axios
      .post(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...JSON.parse(localStorage.getItem('@ors_api')),
        },
      })
      .catch((e) => {
        toast.error(`LỖI: ${e.response.data?.message || e.toString()}`);
      });

    return response.data.data;
  }

  static async get(url, headers) {
    const response = await axios
      .get(`${Config.URL}${url}`, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...JSON.parse(localStorage.getItem('@ors_api')),
        },
      })
      .catch((e) => {
        toast.error(`LỖI: ${e.response.data?.message || e.toString()}`);
      });

    return response.data.data;
  }

  static async put(url, data, headers) {
    const response = await axios
      .put(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...JSON.parse(localStorage.getItem('@ors_api')),
        },
      })
      .catch((e) => {
        toast.error(`LỖI: ${e.response.data?.message || e.toString()}`);
      });

    return response.data.data;
  }

  static async delete(url, headers) {
    const response = await axios
      .delete(`${Config.URL}${url}`, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...JSON.parse(localStorage.getItem('@ors_api')),
        },
      })
      .catch((e) => {
        toast.error(`LỖI: ${e.response.data?.message || e.toString()}`);
      });

    return response.data.data;
  }
}

export default Axios;
