import {Cookies} from "react-cookie";
import * as path from "path";

const cookies = new Cookies()

export const setCookie = (name, value, days) => {

    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days)

    return cookies.set(name, value, {path: '/', expires:expires})
}

export const getCookies = (name) => {
    return cookies.get(name)
}

export const removeCookies = (name, path="/") => {
    cookies.remove(name, {path})
}