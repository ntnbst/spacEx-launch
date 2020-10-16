import React from 'react'

const Filters = ({ selectedFilters }) => {
  return (
    <aside>
      <h3 style={{ marginTop: 0 }}>Filters</h3> 
      <FilterTypeWithFilterPills
        selectedFilters={selectedFilters}
        filterTypeName='Launch Year'
        filterLists={[
          { className: 'launch-year', label: 2006 },
          { className: 'launch-year', label: 2007 },
          { className: 'launch-year', label: 2008 },
          { className: 'launch-year', label: 2009 },
          { className: 'launch-year', label: 2010 },
          { className: 'launch-year', label: 2011 },
          { className: 'launch-year', label: 2012 },
          { className: 'launch-year', label: 2013 },
          { className: 'launch-year', label: 2014 },
          { className: 'launch-year', label: 2015 },
          { className: 'launch-year', label: 2016 },
          { className: 'launch-year', label: 2017 },
          { className: 'launch-year', label: 2018 },
          { className: 'launch-year', label: 2019 }, 
          { className: 'launch-year', label: 2020 },
        ]}
      />

      <FilterTypeWithFilterPills
        selectedFilters={selectedFilters}
        filterTypeName='Successful Launch'
        filterLists={[ 
          { className: 'launch-success', label: 'True' },
          { className: 'launch-success', label: 'False' } 
        ]}
      />

      <FilterTypeWithFilterPills
        selectedFilters={selectedFilters}
        filterTypeName='Successful Landing'
        filterLists={[ 
          { className: 'land-success', label: 'True' }, 
          { className: 'land-success', label: 'False' } 
        ]}
      />
    </aside>
  )
}

export default Filters

const FilterTypeWithFilterPills = ({ filterTypeName, filterLists, selectedFilters }) => {
  return (
    <React.Fragment>
      <p className='filter-type-name'>{filterTypeName}</p>
      <section className='type-and-pills'>
        {filterLists.map(filter => (
          <FilterPill  className={filter.className} onClick={selectedFilters} label={filter.label} />
        ))}
      </section>
    </React.Fragment>
  )
}

const FilterPill = ({ onClick, label, className }) => {
  return (
    <div onClick={onClick}  className={`filter-pill ${className}`}>
      {label}
    </div>
  )
}