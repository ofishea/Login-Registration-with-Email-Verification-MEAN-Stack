import { Role } from './role';


export class Account {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    fiatBalance: Number;
    newsletter: Boolean;
    biometric: Boolean;
    country: string;
    email: string;
    role: Role;
    jwtToken?: string;
}