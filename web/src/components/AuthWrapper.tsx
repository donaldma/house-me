import React from 'react'

const AuthWrapper: React.SFC = (props) => (
  <div className='row'>
    <div className='col-lg-4 offset-lg-4 text-center auth-container'>{props.children}</div>
  </div>
)

export default AuthWrapper
