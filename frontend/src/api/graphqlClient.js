import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'Content-Type': 'application/json'},
});

export async function graphqlRequest(query, variables = []) {
    const res = await api.post("", {query, variables});

    if(res.data?.errors?.length){
        throw new Error(res.data.errrs.map((e) => e.message).join(" | "));
    }

    return res.data.data;
}