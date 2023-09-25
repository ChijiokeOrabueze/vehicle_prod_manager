import styled from "styled-components"
import { User } from "../types"

const Container = styled.div`

    diplay

`

const Tile = styled.div`

    display: flex;
    align-items:center;
    gap: 5px;


`

export interface UserTileProps {
    user: User
}

const UserTile = ({user}: UserTileProps) => {
  return (
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
  )
}

export default UserTile