import { ChangePassword } from "../model/ChangePassword";

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#E33232'];
export const categoryTypes = [
    {
        key: 'INCOME',
        value: 'Income',
    },
    {
        key: 'COST',
        value: 'Cost',
    },
];
export const currencies = [
    {
        key: 'EUR',
        value: 'EUR',
    },
    {
        key: 'USD',
        value: 'USD',
    },
    {
        key: 'PLN',
        value: 'PLN',
    },
];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


export const emptyChangePassword: ChangePassword = {
    passwordFirst: "",
    passwordSecond: ""
}