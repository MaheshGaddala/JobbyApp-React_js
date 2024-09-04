import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <div className="similar-job-container">
      <div className="similar-job-company-container">
        <img
          className="similar-job-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-title-container">
          <h1 className="similar-job-title">{title}</h1>
          <p className="similar-job-rating">{rating}</p>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-container">
        <p className="similar-job-location">{location}</p>
        <p className="similar-job-location">{employmentType}</p>
      </div>
    </div>
  )
}
export default SimilarJobItem
