import { Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth/store';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
  const profile = useAuthStore((state) => state.profile);

  const isAuthorized = () => {
    if (requiredRole === 'A' && profile && profile.rol === 'admin') {
      return true;
    } else if (requiredRole === 'C' && profile && profile.rol === 'cliente') {
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      element={isAuthorized() ? element : <Navigate to="/" />}
    />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  requiredRole: PropTypes.oneOf(['A', 'C']).isRequired,
};

export default ProtectedRoute;
