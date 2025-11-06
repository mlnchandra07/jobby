import {Link} from 'react-router-dom'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none', color: 'inherit'}}>
      <li className="job-card">
        <div className="company-role">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="rating">
            <h1 className="role">{title}</h1>
            <p className="rating">
              <FaStar className="rating-logo" /> {rating}
            </p>
          </div>
        </div>
        <div className="job-details">
          <div className="location-type">
            <p className="location">
              <IoLocationOutline /> {location}
            </p>
            <p>
              <BsBriefcaseFill /> {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h2 className="job-description">Description</h2>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
