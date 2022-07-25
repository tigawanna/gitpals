
import { Navigate } from 'react-router-dom';

//@ts-ignore
export const ProtectedRoute = ({ token , children }) => {

  if (!token || token==="") {
    return <Navigate to="/login" replace />;
    }
     return children;
  };
