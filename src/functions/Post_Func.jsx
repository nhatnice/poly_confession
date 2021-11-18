import Axios from 'axios';
import {API_LINK} from './Global';

function getAllConfess(callback) {
    Axios.get(`${API_LINK}get_all_confess`).then((data) => {
      return callback(data.data);
    });
}

function getSingleConfess(post_id, callback) {
    Axios.get(`${API_LINK}get_single_confess/${post_id}`).then((data)=> {
      return callback(data.data)
    })
  }

export {
    getAllConfess,
    getSingleConfess
}