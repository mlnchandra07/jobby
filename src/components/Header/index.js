import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onCLickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header">
      <ul className="list-container">
        <li className="list-item">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/" className="category">
            Home
          </Link>
          <Link to="/jobs" className="category">
            Jobs
          </Link>
        </li>
        <li className="list-item">
          <button
            type="button"
            onClick={onCLickLogout}
            className="logout-button"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
