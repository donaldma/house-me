import React from 'react'
// @ts-ignore
import classNames from 'classnames'

const VertAlign: React.SFC<{ className?: string }> = (props) => (
  <div className={classNames('vert-align', props.className)}>{props.children}</div>
)

export default VertAlign
