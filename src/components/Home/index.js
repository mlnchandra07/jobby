import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home">
    <Header />
    <div className="home-container">
      <h1 className="find-heading">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="find-description">
        Millions of people are searching for jobs, salary
        <br /> information, company reviews. Find the job that fits your
        <br /> abilities and potential
      </p>
      <Link to="/jobs">
        <button type="button" className="find-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
