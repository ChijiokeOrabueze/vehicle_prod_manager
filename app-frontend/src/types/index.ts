
export type UserType = "ADMIN" | "REGULAR";


export type User = {
    username: string,
    userType: UserType,
}

export const permissionMap = {
    REGULAR: 0,
    ADMIN: 1,
}