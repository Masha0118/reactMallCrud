import axios from "axios";
import {API_SERVER_HOST} from "./todoApi";


const rest_api_key = 'fd4a7f948da60390e65ca713fee35981'

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

// export const getAccessToken = async (authCode) => {
//
//     const header = {
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         }
//     }
//     const params = {
//         grant_type: "authorization_code",
//         client_id: rest_api_key,
//         redirect_uri: redirect_uri,
//         code: authCode
//     }
//
//     const res = await axios.post(access_token_url, params, header)
//     console.log("res.data: ", res.data)
//
//     return res.data.access_token
// }

export const getAccessToken = async (authCode) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    // grant_type을 포함한 파라미터 정의
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", rest_api_key);
    params.append("redirect_uri", redirect_uri);
    params.append("code", authCode);

    try {
        const res = await axios.post(access_token_url, params, header);
        console.log("res.data: ", res.data);

        return res.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        throw error;
    }
};


export const getMemberWithAccessToken = async(accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);
    return res.data
}