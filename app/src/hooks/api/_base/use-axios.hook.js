import axios from "axios";

export const axiosDefault = (baseUrl) =>{
  return axios.create({
    baseURL: baseUrl
  })
};

export const axiosPrivate = (baseUrl, headers) => {
  return axios.create({
    baseURL: baseUrl,
    headers: headers,//{...headers, 'Content-Type': 'application/json'},
    withCredentials: true,
  });
};