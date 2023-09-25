import styled from "styled-components"
import { Button } from "../styles"


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    padding: 5px 10px;
    border: 2px solid #f4f4f4

`

interface TileProps {
    index: number;
    title: string;
    onUpdateClick: () => void;
    state?: string;
    altBtn?: string;
    disableBtn?: boolean;
}

const Tile = ({index, title, state, onUpdateClick, disableBtn, altBtn}: TileProps) => {
  return (
    <Container>
        <p style={{width: "150px"}}>{index}. {title}</p>
        <p>{state || ""}</p>
        <Button style={{backgroundColor: disableBtn ? "gray" : "#6576ff"}} onClick={!disableBtn ? onUpdateClick : () => {}}>{altBtn || "Update"}</Button>
    </Container>
  )
}

export default Tile