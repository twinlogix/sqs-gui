import { useReactiveVar } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { currentConnectionVar } from '../state'

export const RequireAuth = (props: { children: JSX.Element }) => {

  const currentConnection = useReactiveVar(currentConnectionVar)
  if (!currentConnection) return <Navigate to="/connect" />

  return props.children
}
