import React from 'react'
// @ts-ignore
import classNames from 'classnames'

const Seperator: React.SFC<{ className?: string }> = (props) => (
  <hr className={classNames('seperator', props.className)} />
)

export default Seperator
