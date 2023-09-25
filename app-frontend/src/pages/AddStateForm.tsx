import styled from "styled-components"
import { Button, FormBody, Title } from "../styles"
import Input from "../components/Input"
import Select from "../components/Select"
import { useEffect, useState } from "react"
import { makeApiCall, notify } from "../utils"
import { useLocation, useNavigate } from "react-router-dom"
import { UserType, permissionMap } from "../types"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:24px;
    

`

interface AddStateFormProps {
    authUserType: UserType;
}

const AddStateForm = ({authUserType}:AddStateFormProps) => {

    const [name, setName] = useState("");
    const [order, setOrder] = useState("");
    const [alias, setAlias] = useState("");
    const [minPermission, setMinPermission] = useState<UserType>();
    const navigate = useNavigate();
    const location = useLocation();

    const permissionOptions = ["REGULAR"];

    if (authUserType === "ADMIN") {
        permissionOptions.push("ADMIN")
    }

    const onSuccess = () => {
        navigate("/states")
    }

    const onFailure = (msg: string) => {
        notify(msg);
    }

    const handleSubmit = async () => {

        if (!name || !order){
            notify("name and order is required.")
            return;
        }

        const updateId = location?.state?.id;

        await makeApiCall(
            updateId ? "put" : "post",
            `${import.meta.env.VITE_MAIN_API_URL}/states${updateId ? `/${updateId}` : ""}`,
            {name, alias, order, min_permission: permissionMap[minPermission || "REGULAR"]},
            onSuccess,
            onFailure
        )

    }

    useEffect(()=>{

        if (location.state){
            
            setName(location.state.name);
            setAlias(location.state.alias);
            setOrder(location.state.order);
            
        }

    }, [location.state])

  return (
    <Container>
        <Title>{location.state ? `Update State - ${location.state.name}` : "Add new State"}</Title>
        <FormBody>
            <Input 
                name="name"
                title="Name"
                type="text"
                placeholder="Enter name of state"
                required
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Input 
                name="alias"
                title="Alias"
                type="text"
                placeholder="Enter state alias"
                value={alias}
                onChange={(e)=>{setAlias(e.target.value)}}
            />
            <Input 
                name="state"
                title="Order"
                required
                type="number"
                placeholder="Enter state order"
                value={order}
                onChange={(e)=>{setOrder(e.target.value)}}
            />
            <Select 
                name="minPermission"
                title="Min Permission"
                placeholder="Enter the minimum permitted role"
                options={permissionOptions}
                value={minPermission}
                onChange={(e)=>{setMinPermission(e.target.value as UserType)}}
            />
        </FormBody>
        <Button onClick={handleSubmit}>{location.state ? "Update" : "Submit"}</Button>

    </Container>
  )
}

export default AddStateForm