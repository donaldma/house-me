import './Nav.scss'
import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
// @ts-ignore
import classNames from 'classnames'
// import logo from '/img/logo.svg'
const logo:string = '/img/logo.svg'

interface IProps {
  isAuthenticated?: boolean
  setAuthenticationStatus?: (isAuthenticated: boolean) => void
}

interface IState {
  mobileNavOpen: boolean
}

interface INavConfig {
  title: string
  url: string
}

const navConfig: INavConfig[] = [
  {
    title: 'Prototype Start',
    url: '/'
  },
  {
    title: 'Search Results',
    url: '/listings'
  },
  {
    title: 'How it works',
    url: '/how'
  },
  {
    title: 'About us',
    url: '/about'
  }
]

class Nav extends React.Component<IProps & RouteComponentProps, IState> {
  state = {
    mobileNavOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ mobileNavOpen: false })
    }
  }

  handleNavTriggerClick = () => {
    this.setState({ mobileNavOpen: !this.state.mobileNavOpen })
  }

  wrapperRef = React.createRef<HTMLElement>()

  handleClick = (event: any) => {
    const node = this.wrapperRef.current
    if (node && !node.contains(event.target)) {
      this.setState({ mobileNavOpen: false })
    }
  }

  renderDesktopContent = () => {
    return (
      <ul className='right'>
        {navConfig.map((config, index) => (
          <li key={index} className={this.selectIfActive(config.url)}>
            <Link to={config.url}>{config.title}</Link>
          </li>
        ))}
      </ul>
    )
  }

  renderMobileContent = () => {
    return (
      <ul>
        {navConfig.map((config, index) => (
          <li key={index}  className={this.selectIfActive(config.url)}>
            <Link to={config.url} className='mobile-label'>
              {config.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  selectIfActive = (url: string) => {
    if (this.props.location.pathname === url) {
      return 'selected disabled'
    } else {
      return ''
    }
  }

  render() {
    return (
      <header
        ref={this.wrapperRef}
        className={classNames('nav-header', { 'nav-open': this.state.mobileNavOpen })}
      >
        <div className='mobile-logo'>
          <Link to='/'>
            <img src={logo} alt='nav-logo' className='logo-img' />
          </Link>
        </div>
        <button className='nav-trigger button-link' onClick={() => this.handleNavTriggerClick()}>
          Open Nav
          <span aria-hidden='true' />
        </button>

        <div className='container p-0'>
          <nav className='main-nav'>
            <ul className='left'>
              <li className='logo'>
                <Link to='/'>
                  <img src={logo} alt='nav-logo' className='logo-img' />
                </Link>
              </li>
            </ul>
            {this.renderDesktopContent()}
          </nav>
        </div>

        <div className='dropdown-wrapper pb-0'>
          <div className='dropdown-list'>{this.renderMobileContent()}</div>
        </div>
      </header>
    )
  }
}

export default withRouter(Nav)
