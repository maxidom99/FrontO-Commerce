import { Navigate, Outlet } from "react-router-dom"

const RouteLayout = ({isAllowed, children}) => {
    if(!isAllowed) return <Navigate to="/"/>;
    return children ? <>{children}</> :<Outlet/>;
}

export default RouteLayout;