import './App.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import SearchPage from '../../containers/SearchPage/SearchPage'
import Listings from '../../containers/Listings/Listings'

class App extends React.Component<{}, {}> {

  showPrototype=()=> {
    return(
      <SearchPage/>
    )
  }

  showListings=()=> {
    return(<Listings/>)
  }

  showHow=()=>{
    return(
      <div><p>how it works</p></div>
    )
  }

  showAbout =()=> {
    return (
      <div><p>about us</p></div>
    )
  }

  render() {
    return (
      <Router>
          <Nav
          />
          <div className='app'>
            <Switch>
              <Route exact path='/' component={this.showPrototype}/>
              <Route path='/listings' component={this.showListings}/>
              <Route path='/how' component={this.showHow}/>
              <Route path='/about' component={this.showAbout}/>
            </Switch>
          </div>
      </Router>
    )
  }
}

export default App
