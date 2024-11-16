import axios from "axios";
import {API_SERVER_HOST} from "./todoApi";


const rest_api_key = '72e657c68b8b30ad7ac17b5d1b538af5'

const redirect_uri = 'http://localhost:3000/member/kakao'
// const redirect_uri = 'http://127.0.0.1:3000/member/kakao'

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'

const access_token_url = 'https://kauth.kakao.com/oauth/token'

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    // const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&scope=account_email`;
    // const kakaoURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

    console.log("redirect_uri", redirect_uri)
    return kakaoURL
};

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)
    console.log("res.data: ", res.data)

    const accessToken = res.data.access_token

    return accessToken
}

export const getMemberWithAccessToken = async(accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);
    return res.data
}