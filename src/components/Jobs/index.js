import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employeeType: [],
    minimumSalary: 0,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileDetails,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })
    const {employeeType, minimumSalary, searchInput} = this.state
    const type = employeeType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${minimumSalary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onChangeSalary = event => {
    this.setState({minimumSalary: event.target.value}, this.getJobs)
  }

  onChangeEmployeType = event => {
    const {employeeType} = this.state
    const includeType = employeeType.includes(event.target.value)
    if (!includeType) {
      this.setState(
        {employeeType: [...employeeType, event.target.value]},
        this.getJobs,
      )
    } else {
      const filtertype = employeeType.filter(
        each => each !== event.target.value,
      )
      this.setState({employeeType: [...filtertype]}, this.getJobs)
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <button
        type="button"
        id="button"
        className="profile-failure-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const hasJobs = jobsList.length > 0

    return hasJobs ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          {this.renderProfileDetails()}
          <hr />
          <div>
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(each => (
                <li className="employee-item" key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    onChange={this.onChangeEmployeType}
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="check-label"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <li className="salary-item" key={each.salaryRangeId}>
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    value={each.salaryRangeId}
                    name="salary"
                    className="check-input"
                    onChange={this.onChangeSalary}
                  />
                  <label htmlFor={each.salaryRangeId} className="check-label">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-content">
            <div className="search-input-jobs-list-container">
              <div className="search-input-container-desktop">
                <input
                  type="search"
                  value={searchInput}
                  className="search-input-desktop"
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-button-container-desktop"
                  onClick={this.getJobs}
                >
                  <BsSearch className="search-icon-desktop" />
                </button>
              </div>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
