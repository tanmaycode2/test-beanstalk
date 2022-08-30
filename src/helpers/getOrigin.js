import url_settings from '../config/config';
import axios from 'axios';

export const origin = () => {
    let origin = window.location.origin.toLowerCase();
    if(origin.includes('https://')) origin = origin.replace('https://', '');
    else origin = origin.replace('http://', '');
    // console.log(origin, url_settings[origin], url_settings[origin].SERVER_URL);
    axios.defaults.baseURL = url_settings[origin].SERVER_URL;

    return origin;
}