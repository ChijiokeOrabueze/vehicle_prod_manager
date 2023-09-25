import styled from "styled-components"
import { User } from "../types"
import { Button } from "../styles"

const Container = styled.div`

    diplay

`

const Tile = styled.div`

    display: flex;
    align-items:center;
    gap: 5px;


`

export interface UserTileProps {
    user: User,
    logout: () => void;
}

const UserTile = ({user, logout}: UserTileProps) => {
  return (
    <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
        <div>
        <Tile>
            <h3>username: </h3>
            <p>{user.username}</p>
        </Tile>
        <Tile>
            <h3>userType: </h3>
            <p>{user.userType}</p>
        </Tile>
        </div>
        
        <Button style={{backgroundColor: "tomato"}} onClick={logout}>Logout</Button>
    </div>
  )
}

export default UserTile