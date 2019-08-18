import './App.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'

class App extends React.Component<{}, {}> {

  showPrototype=()=> {
    return(
      <div><p>prototype</p></div>
    )
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
          <div className='app container'>
            <Switch>
              <Route exact path='/' component={this.showPrototype}/>
              {/* <Route path='/listings' component={this.showPrototype}/>
              <Route path='/listings:id' component={this.showPrototype}/> */}
              <Route path='/how' component={this.showHow}/>
              <Route path='/about' component={this.showAbout}/>
            </Switch>
          </div>
      </Router>
    )
  }
}

export default App
