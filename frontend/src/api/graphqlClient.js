import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'Content-Type': 'application/json'},
});

export async function graphqlRequest(query, variables = []) {
    const res = await api.post("", {query, variables});

    try {

        if(Array.isArray(res.data?.errors) && res.data.errors.length > 0) {
            throw new Error(res.data.errors.map((e) => e.message).join(" | "));
        }

        if(!res.data || typeof res.data !== 'object' || !("data" in res.data)) {
            throw new Error(`Unexpected response: ${JSON.stringify(res.data)}`);
        }

        return res.data.data;        
    } catch (err) {
        if(axios.isAxiosError(err)){
            const status = err.response?.status;
            const body = err.response?.data;

            if(body?.errors && Array.isArray(body.errors)) {
                throw new Error(body.errors.map((e) => e.message().join(" | ")));
            }

            throw new Error(
                `Request failed${status ? ` (${status})` : ""}: ${typeof body === "string" ? body : JSON.stringify(body)}`
            );
        }
        throw err;
    }

    
}