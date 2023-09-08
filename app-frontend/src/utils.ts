import { TypeOptions, toast } from "react-toastify"

export const notify = (msg: string, type?: TypeOptions) => {
    toast(msg, {type: type || "error", position: "top-center", theme:"colored"})
}