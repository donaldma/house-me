import React, { Fragment } from 'react'

const ConditionalRender: React.SFC<{ field: any }> = (props) =>
  props.field ? <Fragment>{props.children}</Fragment> : null

export default ConditionalRender
