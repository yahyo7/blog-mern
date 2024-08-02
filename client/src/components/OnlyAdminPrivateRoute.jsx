import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export const OnlyAdminPrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user)
  return currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
}
