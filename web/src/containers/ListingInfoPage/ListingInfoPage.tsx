import React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import './ListingInfoPage.scss'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ContentLoader from 'react-content-loader'
import { ListingService, FullListingDetails } from '../../services/ListingService'

const CarouselLoader = () => (
  <ContentLoader height={350} width={1050} speed={2} primaryColor='#f3f3f3' secondaryColor='#ecebeb'>
    <rect x='12' y='21' rx='0' ry='0' width='1025' height='350' />
  </ContentLoader>
)

const MyPageLoader = () => (
  <ContentLoader height={500} width={1110} speed={2} primaryColor='#f3f3f3' secondaryColor='#ecebeb'>
    <rect x='750' y='50' rx='3' ry='3' width='350' height='200' />
    <rect x='12' y='50' rx='3' ry='3' width='700' height='25' />
    <rect x='12' y='100' rx='3' ry='3' width='700' height='150' />
  </ContentLoader>
)

interface IParams {
  id: string
}

interface IListingInfoPageProps extends RouteComponentProps<IParams> {}

interface IListingInfoPageState {
  loading: boolean
  modalShow: boolean
  messageSent: boolean
  info: FullListingDetails | null
}

class ListingInfoPage extends React.Component<IListingInfoPageProps, IListingInfoPageState> {
  state = {
    loading: true,
    modalShow: false,
    messageSent: false,
    info: null
  }

  componentDidMount = async () => {
    // call api
    // update loading state when done
    console.log('loading info page')
    console.log(this.props.match.params)
    let param = this.props.match.params
    console.log(param.id)
    console.log(ListingService.getSingleListing(param.id))
    const details: FullListingDetails = await ListingService.getSingleListing(param.id)
    this.setState({
      loading: false,
      info: details
    })
  }

  openModal = () => {
    this.setState({
      modalShow: true
    })
  }

  closeModal = () => {
    this.setState({
      modalShow: false,
      messageSent: false
    })
  }

  showModalMessage = () => {
    if (this.state.messageSent) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Message sent!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Thanks for trying our prototype. </strong></p> <p>If you thought this was cool, we'd love to chat and potentially join your company.</p>
          </Modal.Body>
          <Modal.Footer>
            {/* <button  className='btn btn-secondary' onClick={() => this.setState({ messageSent: false })}>Go back</button> */}
            <Link to='/about'>
              <button className='btn btn-primary'>About us</button>
            </Link>
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Write a message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Group controlId='formBasicSubject'>
                  <Form.Label>Email Topic</Form.Label>
                  <Form.Control type='textarea' placeholder='subject line' />
                  <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicMessage'>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as='textarea' rows='10'placeholder='Hi there! I found your listing through Liv.rent and I would like to know more about your property' />
                </Form.Group>
                {/* <Form.Group controlId='formBasicChecbox'>
                  <Form.Check type='checkbox' label='some kind of captcha' />
                </Form.Group> */}
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-primary' onClick={() => this.setState({ messageSent: true })}>
              Send message (pretend)
            </button>
          </Modal.Footer>
        </div>
      )
    }
  }

  showContactCard = () => {
    return (
      <div className='col-md-3'>
        <div className='side-bar-contact'>
          <div className='coloredTab'></div>
          <div className='border-box'>
            <div className='cost-info'>
              <h2 className='inline'>
                <strong>{this.getCheckedPrice()}</strong>
              </h2>
              <p className='inline'>/ month</p>
            </div>
            <div className='contactButtons'>
              <button className='btn btn-primary btn-block blue-button' onClick={() => this.openModal()}>
                chat with landlord
              </button>
              <button className='btn btn-white btn-block white-button' onClick={() => this.openModal()}>
                chat with landlord
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  showContent = () => {
    if (this.state.info) {
      return (
        <div className='listing-content'>
        <h2 className='section-title'>{this.getCheckedTitle()}</h2>
          <h2 className='section-title'>{this.getCheckedLocation()}</h2>
          <ul className='info-tags'>
            <li>{this.getCheckedBed()} bedrooms</li>
            <li>{this.getCheckedBaths()} bathrooms</li>
            <li>{this.getCheckedSQFT()} SQFT</li>
            <li>Furnished?</li>
            <li><a href={this.getCheckedLisingURL()} target="_blank">view source</a></li>
          </ul>
          <h2 className='section-title'> Description </h2>
          <div><p>{this.getCheckedDescription()}</p></div>
        </div>
      )
    } else {
      return <div />
    }
  }

  getCheckedTitle = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      if (!infoCheck.title) {
        return <span>?</span>
      } else {
        return <span>{infoCheck.title}</span>
      }
    }
  }

  getCheckedLocation = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      if (!infoCheck.location) {
        return <span>?</span>
      } else {
        return <span>{infoCheck.location}</span>
      }
    }
  }

  getCheckedBed = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      if (!infoCheck.beds) {
        return <span>?</span>
      } else {
        return <span>{infoCheck.beds}</span>
      }
    }
  }

  getCheckedBaths = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      if (!infoCheck.baths) {
        return <span>?</span>
      } else {
        return <span>{infoCheck.baths}</span>
      }
    }
  }
  
  getCheckedSQFT = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      if (!infoCheck.sqft) {
        return <span>?</span>
      } else {
        return <span>{infoCheck.sqft}</span>
      }
    }
  }
  
  getCheckedLisingURL = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return ''
    } else {
      return infoCheck.listingUrl
    }
  }
  
  getCheckedDescription = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      return <span>{infoCheck.description}</span>
      }
    }
  
  getCheckedPrice = () => {
    let infoCheck: any = this.state.info
    if (!infoCheck) {
      return <span>?</span>
    } else {
      return <span>{infoCheck.price}</span>
      }
    }

    getCheckedImages = () => {
      let infoCheck: any = this.state.info
      if (!infoCheck) {
        return []
      } else {
        return infoCheck.images
      }
    }

  showIfLoaded = () => {
    if (this.state.loading) {
      return (
        <div>
          <CarouselLoader />
          <div className='container'>
            <MyPageLoader />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id='photos-section'>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-9'>{this.showContent()}</div>
              {this.showContactCard()}
            </div>
          </div>
          <Modal show={this.state.modalShow} onHide={this.closeModal}>
            {this.showModalMessage()}
          </Modal>
        </div>
      )
    }
  }

  render() {
    return <div>{this.showIfLoaded()}</div>
  }
}
export default withRouter(ListingInfoPage)
