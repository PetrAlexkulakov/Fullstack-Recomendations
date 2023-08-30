import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
    isAuthenticated,
    redirectPath = '/auth',
    children,
  }: {
    isAuthenticated: boolean,
    redirectPath: string,
    children?: React.ReactNode
  }) => {
    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default PrivateRoute;