import {Component} from 'react'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import Profile from '../Profile'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
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

class AllJobsSection extends Component {
  state = {
    searchInput: '',
    employmentTypeId: '',
    salaryRangeId: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {searchInput, employmentTypeId, salaryRangeId} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeId}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
        </div>
      )
    }
    return (
      <div className="success-list">
        <ul>
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  changeInput = value => {
    this.setState({searchInput: value})
  }

  searching = () => {
    this.getJobsData()
  }

  changeEmploymentType = employmentTypeId => {
    this.setState({employmentTypeId}, this.getJobsData)
  }

  changeSalaryRange = salaryRangeId => {
    this.setState({salaryRangeId}, this.getJobsData)
  }

  render() {
    const {searchInput, employmentTypeId, salaryRangeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="all-jobs-section-main-container">
            <div className="all-jobs-section-profile-container">
              <Profile />
              <FiltersGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                searchInput={searchInput}
                changeInput={this.changeInput}
                searching={this.searching}
                employmentTypeId={employmentTypeId}
                changeEmploymentType={this.changeEmploymentType}
                salaryRangeId={salaryRangeId}
                changeSalaryRange={this.changeSalaryRange}
              />
            </div>
            <div>{this.renderStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default AllJobsSection
