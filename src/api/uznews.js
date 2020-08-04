import axios from 'axios';
import { uznews_url } from './config';

export default axios.create({
    baseURL: uznews_url + '/api/v1',
});