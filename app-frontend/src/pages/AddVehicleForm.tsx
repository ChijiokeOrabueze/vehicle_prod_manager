import styled from "styled-components"
import { Button, FormBody, Title } from "../styles"
import Input from "../components/Input"
import Select from "../components/Select"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { makeApiCall, notify } from "../utils"
import useFetchItems from "../hooks/useFetchItems"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:24px;
    

`

const AddVehicleForm = () => {
    const states = useFetchItems<{name: string, alias: string, order: number, id: number}[]>("states");
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const onSuccess = () => {
        navigate("/home")
    }

    const onFailure = (msg: string) => {
        notify(msg);
    }

    const stateMap: {[x in string]: number} = {};
    const stateOptions = states?.map(({name, order, alias, id})=>{
        const state = `${name}${alias ? ` (${alias})`: ""}-${order}`;
        stateMap[state] = id;

        return state;
    })

    const handleSubmit = async() => {
        if (!name || !state){
            notify("vehicle name and state is required.")
            return;
        }

        const updateId = location?.state?.id;


        await makeApiCall(
            updateId ? "put" : "post",
            `${import.meta.env.VITE_MAIN_API_URL}/vehicles${updateId ? `/${updateId}` : ""}`,
            {name, state_id: stateMap[state]},
            onSuccess,
            onFailure
        )
    }

    useEffect(()=>{

        if (location.state){
            const currState = states?.find((state)=>(state.id == location.state.state.id))
            setName(location.state.name);
            setState(currState ?
                `${currState?.name}${currState?.alias ? ` (${currState?.alias})`: ""}-${currState?.order}`:
                ""
            )
        }

    }, [location.state, states])


  return (
    <Container>
        <Title>{location.state ? `Update Vehicle - ${location.state?.name}` : "Add new Vehicle"}</Title>
        <FormBody>
            <Input 
                name="name"
                title="Name"
                type="text"
                required
                placeholder="Enter name of vehicle"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Select 
                name="state"
                title="State"
                required
                options={stateOptions || []}
                placeholder="Select vehicle state"
                value={state}
                onChange={(e)=>{setState(e.target.value)}}
            />
        </FormBody>
        <Button onClick={handleSubmit}>{location.state ? "Update" : "Submit"}</Button>

    </Container>
  )
}

export default AddVehicleForm