import styled from "styled-components"
import Input from "../components/Input"
import { Button } from "../styles"
import Tile from "../components/Tile"
import { useNavigate } from "react-router-dom"
import UserTile, { UserTileProps } from "../components/UserTile"
import useFetchItems from "../hooks/useFetchItems"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    gap:24px;
    padding-top: 20px;

`

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 60%;

`

const Title = styled.h2`

`

const Header = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    margin-bottom: 30px;

`

const Buttons = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    

`

interface HomeProps extends UserTileProps {

}


const Home = ({user, logout}: HomeProps) => {
    const navigate = useNavigate();
    const vehicles = useFetchItems<{name: string, state_name: string, state_id: number, state_order: number, id: number}[]>("vehicles");

  return (
    <Container>
        <Title>Welcome to Your Xpak Account</Title>
        <UserTile user={user} logout={()=>{logout(); navigate("/")}} />
        <Box>
            <Header>
                <h3 style={{flex: "2"}}>Vehicles Available</h3>

                <Buttons>
                    <Button onClick={()=>{navigate("/new-vehicle")}}>Add Vehicle</Button>
                    <Button onClick={()=>{navigate("/states")}}>View States</Button>
                </Buttons>
                
            </Header>
            <div style={{width: "100%"}}>
                {
                    
                    vehicles && !vehicles.length ?
                    <p>No vehicles added</p> :
                    vehicles && vehicles.length ?
                    vehicles.map((vehicle, index)=>(
                        <Tile
                            key={vehicle.id}
                            index={index + 1}
                            title={`${vehicle.name}`}
                            state={vehicle?.state_name?.toString()}
                            onUpdateClick={()=>{navigate("/update-vehicle", {state: {
                                id: vehicle.id,
                                name: vehicle.name,
                                state: {
                                    id: vehicle.state_id
                                }
                            }})}}
                        />
                    )): null
    
                    
                }
            </div>
        </Box>

        

    </Container>
  )
}

export default Home