import { TypeOptions, toast } from "react-toastify"

export const notify = (msg: string, type?: TypeOptions) => {
    toast(msg, {type: type || "error", position: "top-center", theme:"colored"})
}

export const makeApiCall = async(method: "post" | "get" | "put", url: string, payload: Record<any, any>, onResponseOk: (data: any) => void, onFailure: (msg: string) => void) => {

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const resp = await response.json();

    if (response.ok){
        onResponseOk(resp.data);
        return;
    }

    onFailure(resp.message);
}