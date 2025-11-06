import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
// import {FaRegStar} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobs = props => {
  const {eachElement} = props
  return (
    <li className="similar-job">
      <div className="logo-role">
        <div>
          <img
            className="company-logo"
            src={eachElement.company_logo_url}
            alt="similar job company logo"
          />
        </div>
        <div>
          <h1 className="title">{eachElement.title}</h1>
          <p>
            <FaStar className="Star" />
            &nbsp;{eachElement.rating}
          </p>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="description-text">{eachElement.job_description}</p>
      <div className="job-detail">
        <p className="location">
          <IoLocationOutline />
          {eachElement.location}
        </p>
        <p className="type">
          <BsBriefcaseFill />
          {eachElement.employment_type}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobs
