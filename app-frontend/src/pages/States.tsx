import styled from "styled-components"
import Tile from "../components/Tile"
import { useNavigate } from "react-router-dom"
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

const Button = styled.div`

    background: #6576ff;
    border-radius: 3px;
    color: white;
    width: 120px;
    height: 36px;
    padding: 8px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    border: 0;

`

const Header = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;

`

const Buttons = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    

`


const States = () => {
    const navigate = useNavigate();
    const states = useFetchItems<{name: string, alias: string, order: number, id: number}[]>("states");

  return (
    <Container>
        <Title>Welcome to Your Xpak Account</Title>
        <Box>
            <Header>
                <h3 style={{flex: "2"}}>All States</h3>

                <Buttons>
                    <Button onClick={()=>{navigate("/new-state");}}>Add State</Button>
                    <Button onClick={()=>{navigate("/home")}}>Home</Button>
                </Buttons>
                
            </Header>
            <div style={{width: "100%"}}>
                {
                    states && !states.length ?
                    <p>No States added</p> :
                    states && states.length ?
                    states.map((state, index)=>(
                        <Tile
                            key={state.id}
                            index={index + 1}
                            title={`${state.name}${state.alias ? ` (${state.alias})`: ""}`}
                            state={state.order.toString()}
                            onUpdateClick={()=>{navigate("/update-state", {state: {
                                id: state.id,
                                name: state.name,
                                order: state.order,
                                alias: state.alias
                            }})}}
                        />
                    )): null

                }
            </div>
        </Box>

        
        

    </Container>
  )
}

export default States