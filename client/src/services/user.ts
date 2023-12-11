import { BASE_URL, LIST, USERS } from "@/configs/constants";
import axios from "axios";

export const addUser = async (payload: object) => {
    return axios.post(BASE_URL + USERS, payload)
}
