
export type UserType = "ADMIN" | "REGULAR";


export type User = {
    username: string,
    userType: UserType,
}

export type StateType = {name: string, alias: string, order: number, id: number, min_permission: number}

export const permissionMap = {
    REGULAR: 0,
    ADMIN: 1,
}