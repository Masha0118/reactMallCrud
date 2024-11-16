import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `/api/todo`

export const getOne = async (tno) => {

    if (!tno) {
        console.error("Invalid tno: ", tno);
        return;
    }

    const res = await jwtAxios.get(`${prefix}/${tno}`);
    return res.data
}

export const getList = async ( pageParam ) => {
    const {page, size} = pageParam

    if (isNaN(size) || isNaN(page)) {
        console.error("Invalid page or size value", {page, size});
        return
    }

    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}});

    return res.data

}
export const postAdd = async (todoObj) => {
    const res = await jwtAxios.post(`${prefix}/`, todoObj)
    return res.data
};

export const deleteOne = async (tno) => {
    const res = await jwtAxios.delete(`${prefix}/${tno}`)
    return res.data
};

export const putOne = async (todo) => {
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo)
    return res.data
};