import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-card-container">
        <div className="job-card-logo-container">
          <img className="job-card-logo" src={companyLogoUrl} alt={title} />
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
          <h1 className="job-card-description-heading">Description</h1>
          <p className="job-card-description">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
