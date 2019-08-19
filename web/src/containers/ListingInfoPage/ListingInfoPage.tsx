import React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import './ListingInfoPage.scss'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ContentLoader from 'react-content-loader'

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

interface IListingInfoPageProps extends RouteComponentProps {
  // webListingID:number
  // is a URL param
}

interface IListingInfoPageState {
  loading: boolean
  modalShow: boolean
  messageSent: boolean
}

class ListingInfoPage extends React.Component<IListingInfoPageProps, IListingInfoPageState> {
  state = {
    loading: true,
    modalShow: false,
    messageSent: false
  }

  componentWillMount = () => {
    // call api
    // update loading state when done
    this.setState({
      loading: false
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
            <p>message sent!</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.setState({ messageSent: false })}>Go back</button>
            <Link to='/about'>
              <button>About us</button>
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
                  <Form.Control as='textarea' rows='10' />
                </Form.Group>
                <Form.Group controlId='formBasicChecbox'>
                  <Form.Check type='checkbox' label='some kind of captcha' />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.setState({ messageSent: true })}>
              Send message; go to next modal content panel
            </button>
          </Modal.Footer>
        </div>
      )
    }
  }

  showContactCard = () => {
    return <div className='col-md-3'>
      <div className='side-bar'>
        Rent / month
          <button onClick={() => this.openModal()}>click to show modal</button>
          <Modal show={this.state.modalShow} onHide={this.closeModal}>
            {this.showModalMessage()}
          </Modal>
      </div>
    </div>
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
          <div>
            
          <h1>photos</h1>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-9'>
                <p> content</p>
              </div>
              {this.showContactCard()}
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return <div>{this.showIfLoaded()}</div>
  }
}
export default withRouter(ListingInfoPage)
