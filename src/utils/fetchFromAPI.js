import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const optionsVideos = {
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchVideosFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, optionsVideos);
  return data;
};

const optionsChannel = {
  url: BASE_URL,
  params: {},
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchChannelFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, optionsChannel);
  return data;
};
