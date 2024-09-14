// api/deezer.js
import axios from 'axios';

const BASE_URL = 'https://api.deezer.com/';

export const searchSongs = async (query) => {
  try {
    console.log('fetching:', query)
    const response = await axios.get(`${BASE_URL}search?q=${query}`);
    console.log(response.data)
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
