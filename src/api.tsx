import axios from "axios";
const API_KEY = 'AIzaSyCPgGPSdtns0KRch71WhtNUzY-ugd_zFDI'
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        order: 'date',
        regionCode: "KR",
        maxResults: 5,
        key :API_KEY
    }
})