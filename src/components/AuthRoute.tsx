import { Navigate } from 'react-router-dom';
import Storage from 'src/utils/storage';

type Props = {
  element: JSX.Element;
};

const AuthRoute: React.FC<Props> = ({ element }) => {
  const accessToken = Storage.getAccessToken();

  return <>{!accessToken ? element : <Navigate to="/" />}</>;
};

export default AuthRoute;
