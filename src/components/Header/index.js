import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
      </Link>
      <ul className="headers-heading-container">
        <Link to="/">
          <li className="link">Home</li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="link">Jobs</li>
        </Link>
      </ul>
      <li className="link">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}
export default withRouter(Header)
