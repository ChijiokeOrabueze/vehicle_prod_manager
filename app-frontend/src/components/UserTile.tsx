import { User } from "../types"


export interface UserTileProps {
    user: User
}

const UserTile = ({user}: UserTileProps) => {
  return (
    <div>UserTile</div>
  )
}

export default UserTile