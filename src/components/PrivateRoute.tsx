import { Navigate } from 'react-router-dom';
import Storage from 'src/utils/storage';

type Props = {
  element: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ element }) => {
  const accessToken = Storage.getAccessToken();

  return <>{accessToken ? element : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
