import axios from "axios";

// ✅ 번역 요청
export const translate = (chat: string, target: string): Promise<any> => {
  const APIKEY = process.env.REACT_APP_GOOGLE_TRANSLATION_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${APIKEY}`;
  return axios.post(url, {
    q: [chat],
    target: target,
  });
};
