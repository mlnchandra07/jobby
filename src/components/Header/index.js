import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onCLickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <button type="button" onClick={onCLickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
