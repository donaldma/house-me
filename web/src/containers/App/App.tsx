import './App.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import ScrollToTop from '../../components/ScrollToTop'
import { AuthService } from '../../services/AuthService'
import ToastWrapper from '../../components/ToastWrapper/ToastWrapper'
import Nav from '../../components/Nav/Nav'
import Login from '../Login'
import SignUp from '../SignUp'
import AuthWrapper from '../../components/AuthWrapper'
import Records from '../Records'
import { IRecordEntity, RecordService } from '../../services/RecordService'
import { ErrorService } from '../../services/ErrorService'
import Iou from '../Iou'
import NewRecord from '../NewRecord'
import EditRecord from '../EditRecord'

interface IState {
  isAuthenticated: boolean
  records: IRecordEntity[]
}

class App extends React.Component<{}, IState> {
  state: IState = {
    isAuthenticated: AuthService.isAuthenticated(),
    records: []
  }

  async componentDidMount() {
    await this.fetchRecords()
  }

  fetchRecords = async () => {
    try {
      const records = await RecordService.getAll()
      this.setState({
        records
      })
    } catch (err) {
      ErrorService.parseServerError(err)
    }
  }

  setAuthenticationStatus = (isAuthenticated: boolean) => {
    this.setState({
      isAuthenticated
    })
  }

  renderHome = () => <div>Home</div>

  renderLogin = () => (
    <AuthWrapper>
      <Login setAuthenticationStatus={this.setAuthenticationStatus} />
    </AuthWrapper>
  )

  renderSignUp = () => (
    <AuthWrapper>
      <SignUp setAuthenticationStatus={this.setAuthenticationStatus} />
    </AuthWrapper>
  )

  renderRecords = () => <Records records={this.state.records} />

  renderIou = () => <Iou records={this.state.records} />

  renderRecordsNew = () => (
    <AuthWrapper>
      <NewRecord fetchRecords={this.fetchRecords} />
    </AuthWrapper>
  )

  renderRecordsEdit = () => (
    <AuthWrapper>
      <EditRecord fetchRecords={this.fetchRecords} />
    </AuthWrapper>
  )

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Nav
            isAuthenticated={this.state.isAuthenticated}
            setAuthenticationStatus={this.setAuthenticationStatus}
          />
          <div className='app container'>
            <Switch>
              <Route exact path='/records' component={this.renderRecords} />
              <Route exact path='/iou' component={this.renderIou} />
              <Route exact path='/records/new' component={this.renderRecordsNew} />
              <Route exact path='/records/edit/:recordId' component={this.renderRecordsEdit} />

              {/* default to homepage */}
              <Route component={this.renderRecords} />
            </Switch>
          </div>
        </ScrollToTop>
        <ToastWrapper />
      </Router>
    )
  }
}

export default App
