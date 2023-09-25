import styled from "styled-components"
import { Button, FormBody, Title } from "../styles"
import Input from "../components/Input"
import Select from "../components/Select"
import { useState } from "react"


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

    const handleSubmit = () => {

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
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Input 
                name="state"
                title="Order"
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