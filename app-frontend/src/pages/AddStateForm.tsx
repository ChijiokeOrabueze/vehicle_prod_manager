import styled from "styled-components"
import { Button, FormBody, Title } from "../styles"
import Input from "../components/Input"
import Select from "../components/Select"
import { useState } from "react"
import { makeApiCall, notify } from "../utils"
import { useNavigate } from "react-router-dom"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:24px;
    

`

const AddStateForm = () => {

    const [name, setName] = useState("");
    const [order, setOrder] = useState("");
    const [alias, setAlias] = useState("");
    const navigate = useNavigate();

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

        await makeApiCall(
            "post",
            `${import.meta.env.VITE_MAIN_API_URL}/states`,
            {name, alias, order},
            onSuccess,
            onFailure
        )

    }
  return (
    <Container>
        <Title>Add new State</Title>
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
        </FormBody>
        <Button onClick={handleSubmit}>Submit</Button>

    </Container>
  )
}

export default AddStateForm