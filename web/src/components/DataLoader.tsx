import React, { Fragment } from 'react'

interface IProps<T> {
  data: T | null
  error: string
  isLoading: boolean
  component: React.ReactNode
}

class DataLoader<T> extends React.Component<IProps<T>> {
  render() {
    console.log('DataLoader')
    const { data, error, isLoading, component } = this.props
    return (
      <Fragment>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading..</div>}
        {data && React.isValidElement(component) && React.cloneElement(component, { ...data })}
      </Fragment>
    )
  }
}

export default DataLoader
