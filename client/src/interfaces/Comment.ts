import { IUser } from "./User";

export interface IComment {
    text: string;
    user: IUser;
}