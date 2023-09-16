import baseAxios from 'axios';

// axios 객체 설정
const axios = baseAxios.create({
  baseURL: 'http://j9d101a.p.ssafy.io:8094/', // 기본 URL
  // withCredentials: true, // 요청 시 인증정보(쿠키 등) 자동 포함
  headers: {
    'Content-Type': 'application/json', // 요청의 Content-Type 을 json으로 지정
  },
});

export const requestGet = async (url, params) => {
  try {
    const data = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestPost = async (url, body, headers) => {
  try {
    const data = await axios.post(url, body, { headers });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPut = async (url, body, headers) => {
  try {
    const data = await axios.put(url, body, { headers });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestDel = async (url) => {
  try {
    const data = await axios.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default axios;