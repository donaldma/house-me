import React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import './ListingInfoPage.scss'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

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

  openModal = () => {
    this.setState({
      modalShow: true,
    })
  }

  closeModal = () => {
    this.setState({
        modalShow: false,
      messageSent: false
      })
  }

  

  componentWillMount = () => {
    // call api here
    this.setState({
      loading: false
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
            <button onClick={()=>this.setState({messageSent:false})}>Go back</button>
            <Link to='/about'><button>About us</button></Link>
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
                  <Form.Control as="textarea" rows="10"/>
                </Form.Group>
                <Form.Group controlId='formBasicChecbox'>
                  <Form.Check type='checkbox' label='some kind of captcha' />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={()=>this.setState({messageSent:true})}>Send message; go to next modal content panel</button>
          </Modal.Footer>
        </div>
      )
    }
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
          <p>details</p>
          <button onClick={() => this.openModal()}>click to show modal</button>
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
