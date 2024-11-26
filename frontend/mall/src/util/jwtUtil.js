import axios from "axios";
import {getCookies, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";
import {wait} from "@testing-library/user-event/dist/utils";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST

    const header = {headers: {"Authorization": `Bearer ${accessToken}`}}

    const res = await jwtAxios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("---------------------");
    console.log("res data: ", res.data)
    console.log("accessToken", accessToken)

    return res.data
}

const beforeReq = (config) => {
    console.log("before request............", config.headers)

    const memberInfo = getCookies("member")

    console.log("Member Info: " , memberInfo)

    if (!memberInfo) {
        console.log("Member NOT FOUND")

        return Promise.reject(
            {
                response:
                    {
                        data:
                            {error: "REQUIRE_LOGIN"}
                    }
            }
        )
    }

    const {accessToken} = memberInfo

    config.headers.Authorization = `Bearer ${accessToken}`

    return config;
}

const requestFail = (err) => {
    console.log("request error..........")

    return Promise.reject(err)
}

const beforeRes = async (res) => {
    console.log("before return response..........")

    console.log(res)

    const data = res.data

    if (data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookieValue = getCookies("member")

        const result = await refreshJWT( memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)
    }

    return res;
}

const responseFail = (err) => {
    console.log("response fail error.........")
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios