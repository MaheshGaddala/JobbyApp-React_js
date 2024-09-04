import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-bg-container">
        <form onSubmit={this.submitForm} className="login-page-card-container">
          <div className="login-logo-container">
            <img
              className="login-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <div className="login-fields-container">
            <label className="login-label" htmlFor="name">
              USERNAME
            </label>
            <input
              className="login-input"
              value={username}
              id="name"
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="login-input"
              value={password}
              id="password"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p>*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
