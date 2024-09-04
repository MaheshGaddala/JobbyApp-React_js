import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, salaryRangesList, searchInput} = props

  const renderEmploymentTypesList = () => (
    <div>
      <hr />
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(eachItem => {
          const {changeEmploymentType} = props
          const employmentTypeClicked = () => {
            changeEmploymentType(eachItem.employmentTypeId)
          }
          return (
            <li
              key={eachItem.employmentTypeId}
              onClick={employmentTypeClicked}
              className="filters-list-item"
            >
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.label}
              />
              <label htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () => (
    <div>
      <hr />
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(eachRange => {
          const {changeSalaryRange} = props
          const salaryRangeClicked = () => {
            changeSalaryRange(eachRange.salaryRangeId)
          }
          return (
            <li
              onClick={salaryRangeClicked}
              key={eachRange.salaryRangeId}
              className="filters-list-item"
            >
              <input
                type="radio"
                id={eachRange.salaryRangeId}
                name="package"
                value={eachRange.label}
              />
              <label htmlFor={eachRange.salaryRangeId}>{eachRange.label}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const onChangeInput = event => {
    const {changeInput} = props
    changeInput(event.target.value)
  }
  const searchingJobs = event => {
    const {searching} = props
    if (event.key === 'Enter') {
      searching()
    }
  }

  return (
    <div>
      <input
        className="filters-search-input"
        placeholder="Search"
        type="search"
        value={searchInput}
        onChange={onChangeInput}
        onKeyDown={searchingJobs}
      />
      {renderEmploymentTypesList()}
      {renderSalaryRangeList()}
    </div>
  )
}

export default FiltersGroup
