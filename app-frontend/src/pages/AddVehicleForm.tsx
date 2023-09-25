import styled from "styled-components"
import { Button, FormBody, Title } from "../styles"
import Input from "../components/Input"
import Select from "../components/Select"


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

    const handleSubmit = () => {

    }
  return (
    <Container>
        <Title>Add new Vehicle</Title>
        <FormBody>
            <Input 
                name="name"
                title="Name"
                type="text"
                placeholder="Enter name of vehicle"
                // value={username}
                // onChange={(e)=>{setUsername(e.target.value)}}
            />
            <Select 
                name="state"
                title="State"
                options={["hello"]}
                placeholder="Select vehicle state"
                // value={password}
                // onChange={(e)=>{setPassword(e.target.value)}}
            />
        </FormBody>
        <Button onClick={handleSubmit}>Submit</Button>

    </Container>
  )
}

export default AddVehicleForm