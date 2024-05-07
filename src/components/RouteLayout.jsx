import { Navigate } from "react-router-dom"

const RouteLayout = ({isAllowed, children}) => {
    if(!isAllowed) return <Navigate to="/"/>;
    return children ? <>{children}</> :null;
}

export default RouteLayout;