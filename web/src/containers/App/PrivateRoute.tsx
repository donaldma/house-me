import React from 'react'
import { RouteProps, Route } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  component: any
  isAuthenticated: boolean
  setAuthentication: (loggedIn: boolean) => void
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthenticated, setAuthentication, ...rest } = props

  return (
    <Route {...rest} render={(routeProps) => (isAuthenticated ? <Component {...routeProps} /> : <div />)} />
  )
}

export default PrivateRoute
