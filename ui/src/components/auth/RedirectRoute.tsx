import { Redirect, Route, RouteProps } from 'react-router';
import IUser from '../../model/types/UserType';

export type RedirectRouteProps = {
    user: IUser | undefined;
    redirectPath: string;
    antiAuth: boolean;
} & RouteProps;

export default function RedirectRoute({ user, antiAuth, redirectPath, ...props }: RedirectRouteProps) {
    if (user || antiAuth) {
        if (user && antiAuth) {
            return <Redirect to={{ pathname: redirectPath }} />;
        }
        return <Route {...props} />;
    }
    return <Redirect to={{ pathname: redirectPath }} />;
};