import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  updateLifeAtCompanyData = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  updateSkillData = skill => ({
    name: skill.name,
    imageUrl: skill.image_url,
  })

  updateJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: this.updateLifeAtCompanyData(data.life_at_company),
    skills: data.skills.map(eachSkill => this.updateSkillData(eachSkill)),
  })

  updateSimilarJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobData = this.updateJobData(data.job_details)
      const similarJobsData = data.similar_jobs.map(eachJob =>
        this.updateSimilarJobsData(eachJob),
      )
      console.log(jobData)
      this.setState({
        jobDetails: jobData,
        similarJobs: similarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(jobDetails)

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills = [],
    } = jobDetails
    const lifeAtCompanyDescription =
      lifeAtCompany?.description || 'No description available'
    const lifeAtCompanyImage = lifeAtCompany?.imageUrl || 'No Image Available'

    return (
      <>
        <div className="job-card-container">
          <div className="job-card-logo-container">
            <img
              className="job-card-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-card-title-container">
              <h1 className="job-card-title">{title}</h1>
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
          <div className="job-card-l-p-container">
            <div className="job-card-location-container">
              <p className="job-card-location-type">{location}</p>
              <p className="job-card-location-type">{employmentType}</p>
            </div>
            <p className="job-card-package">{packagePerAnnum}</p>
          </div>
          <div className="job-card-description-container">
            <hr className="hr-line" />
            <div>
              <h1 className="job-card-description-heading">Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>
            <p className="job-card-description">{jobDescription}</p>
          </div>
          <div className="job-item-skills-container">
            <h1 className="job-item-sub-headings">Skills</h1>
            <ul className="job-item-skills-list">
              {skills.map(eachSkill => (
                <li className="job-item-skills-list-item" key={eachSkill.name}>
                  <img
                    className="job-item-skills-list-item-image"
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                  />
                  <p className="job-item-skills-list-item-name">
                    {eachSkill.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="job-item-sub-headings">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="job-card-description">{lifeAtCompanyDescription}</p>
              <img
                src={lifeAtCompanyImage}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <h1 className="">Similar Jobs</h1>
        <ul className="job-items-similar-jobs-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getJobDetails()}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-bg-container">
        <Header />
        {this.renderStatus()}
      </div>
    )
  }
}

export default JobItemDetails
