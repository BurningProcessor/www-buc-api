export interface IUser {
    id: number
    email: string
}

export interface IUserLoginData {
    user: IUser
    token: string
}