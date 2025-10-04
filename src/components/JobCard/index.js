import {Link} from 'react-router-dom'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'

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
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h2>{title}</h2>
            <p>
              <FaStar /> {rating}
            </p>
          </div>
        </div>
        <div>
          <p>
            <IoLocationOutline /> {location}
          </p>
          <p>
            <BsBriefcaseFill /> {employmentType}
          </p>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
