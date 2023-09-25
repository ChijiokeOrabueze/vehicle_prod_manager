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
}

const Tile = ({index, title, state, onUpdateClick}: TileProps) => {
  return (
    <Container>
        <p style={{width: "150px"}}>{index}. {title}</p>
        <p>{state || ""}</p>
        <Button onClick={onUpdateClick}>Update</Button>
    </Container>
  )
}

export default Tile