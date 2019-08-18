import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './ListingInfoPage.scss'

interface IListingInfoPageProps extends RouteComponentProps {
  // webListingID:number
  // is a URL param
}

interface IListingInfoPageState {
  loading: boolean
}

class ListingInfoPage extends React.Component<IListingInfoPageProps, IListingInfoPageState> {
  state = {
    loading: true
  }

  componentWillMount = () => {
    // call api here
    this.setState({
      loading: false
    })
  }

  showIfLoaded = () => {
    if (this.state.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>content</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <p>content</p>
      </div>
    )
  }
}
export default withRouter(ListingInfoPage)
