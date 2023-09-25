import { useEffect } from "react";
import { makeApiCall, notify } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

const useFetchItems = <T>(item: "vehicles" | "states") => {
    const [items, setItems] = useLocalStorage<T| undefined>(item, undefined);

    const onSuccess = (data: any) => {
        setItems(data);
    }

    const onFailure = (msg: string) => {
        notify(msg);
    }

    useEffect(() => {
        const fetchItems = async () => {
            await makeApiCall(
                "get",
                `${import.meta.env.VITE_MAIN_API_URL}/${item}`,
                {},
                onSuccess,
                onFailure
            )
        }

        fetchItems()
    },[]);

    return items;
}

export default useFetchItems