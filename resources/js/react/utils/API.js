import axios from 'axios';

let instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: '/api',
    responseType: 'json',
    headers: {
        // 'Content-Type': 'multipart/form-data'
        'Api-Current-URL': window.location.href,
    },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
