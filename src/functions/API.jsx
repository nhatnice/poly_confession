import {SERVER_LINK, API_LINK} from './Global';
import Axios from 'axios';

function getConfessFrom(range, id, callback) {
    Axios.get(API_LINK + 'get_confess/' + range + '/' + id).then((res) => {
        return callback(res.data);
    });
}

function sendEmotionToConfess(emotion, id, callback) {
    //GET USER IP
    Axios.get("https://www.cloudflare.com/cdn-cgi/trace").then((result) => {
        let client_ip = result.data.split('\n')[2].split("=")[1];

        //SEND EMOTION TO API
        Axios.post(API_LINK + 'client_send_emotion/' + id, {emotion: emotion, user_id: "admin", date: new Date(), client_ip: client_ip}).then((res) => {
            return callback(res.data);
        });
    })
}

const API = {
    get: (action, callback) => {
        Axios.get(`${API_LINK}${action}`).then((result) => {
            return callback(result.data);
        })
    },
    post: (action, params, data, callback) => {
        Axios.post(`${API_LINK}${action}${params}`,data).then((result) => {
            return callback(result.data);
        })
    },
    upload_file: (file, callback) => {
        let formData = new FormData();
        
        formData.append("file", file);
        let config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        }
    
        Axios.post(`${API_LINK}upload_file`, formData, config).then(res => {
          return callback(res.data);
        });
    }
}

export {
    getConfessFrom,
    sendEmotionToConfess,
    API
}

