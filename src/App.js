import React, { useEffect, useRef, useState } from 'react';
import { endpoints, makeAPIRequest } from './apiManager';
import Filters from './components/Filters';
import SatelliteCard from './components/SatelliteCard';
import './App.css';

function App() {
  // save all launches collection filtered or non filtered as an array
  const [launches, setLaunchesDetails] = useState([])
  // save filters in individual states
  const [yearFilter, setYearFilter] = useState(null)
  const [successLaunchFilter, setSuccessLaunchFilter] = useState(null)
  const [successLandFilter, setSuccessLandFilter] = useState(null)
  // keep track of the last selected filter
  const [lastSelectedFilter, setLastSelectedFilter] = useState(null)
  // state for is API calling - for loaders 
  const [isApiCalling, setIsAPICalling] = useState(false)

  useEffect(() => {

    async function fetchInitialSatDetails () {

      setIsAPICalling(true)

      let apiParams = {
        limit: 100
      }

      if (yearFilter !== null) {
        apiParams['launch_year'] = yearFilter
      }

      if (successLaunchFilter !== null) {
        apiParams['launch_success'] = successLaunchFilter
      }

      if (successLandFilter !== null) {
        apiParams['land_success'] = successLandFilter
      }

      try {
        const launches = await makeAPIRequest('get', endpoints.launches, apiParams)
        setLaunchesDetails([...launches])
        setIsAPICalling(false)
      } catch (error) {
        return error
      }
    }

    fetchInitialSatDetails()

  }, [yearFilter, successLandFilter, successLaunchFilter])
  // }, [lastSelectedFilter])

  const handleFilterSelectionClick = (e) => {

    if (e.target.className.includes('launch-year')) {
      const currentFilter = e.target.textContent

      setYearFilter(currentFilter)
      setLastSelectedFilter(currentFilter)

      if (lastSelectedFilter === currentFilter) {
        setYearFilter(null)
      }

      const filterPillButton = document.querySelectorAll('.launch-year')
      // console.log('filterPillButton', filterPillButton)

      if (e.target.style.background !== 'red') {
        filterPillButton.forEach(filter => {
          filter.style.background = '#C5E09B'
        })
      }

      if (e.target.style.background !== 'red') {
        e.target.style.background = 'red'
      } else {
        e.target.style.background = '#C5E09B'
      }

      // console.log('ref color', filterRef.current)
      // console.log('current filter=', e.target.textContent)
      // console.log('last filter=', lastSelectedFilter)
    }

    if (e.target.className.includes('launch-success')) {

      const currentFilter = e.target.textContent.toLowerCase()

      setSuccessLaunchFilter(currentFilter)
      setLastSelectedFilter('successLaunch' + currentFilter)
      // adding this successLaunch string with current filter to distinguish
      // whether the filter true/false is from launch or land
      if (lastSelectedFilter === 'successLaunch' + currentFilter) {
        setSuccessLaunchFilter(null)
      }

      const filterPillButton = document.querySelectorAll('.launch-success')
      if (e.target.style.background !== 'red') {
        filterPillButton.forEach(filter => {
          filter.style.background = '#C5E09B'
        })
      }

      if (e.target.style.background !== 'red') {
        e.target.style.background = 'red'
      } else {
        e.target.style.background = '#C5E09B'
      }
     
    }

    if (e.target.className.includes('land-success')) {

      const currentFilter =  e.target.textContent.toLowerCase()

      setSuccessLandFilter(currentFilter)
      setLastSelectedFilter('successLand' + currentFilter)

      if (lastSelectedFilter === 'successLand' + currentFilter) {
        setSuccessLandFilter(null)
      }

      const filterPillButton = document.querySelectorAll('.land-success')
      if (e.target.style.background !== 'red') {
        filterPillButton.forEach(filter => {
          filter.style.background = '#C5E09B'
        })
      }

      if (e.target.style.background !== 'red') {
        e.target.style.background = 'red'
      } else {
        e.target.style.background = '#C5E09B'
      }

    }
  }

  // console.log('launches', launches)
  // console.log('year filters', yearFilter)
  // console.log('lastSelectedFilter', lastSelectedFilter)

  const filterRef = useRef(null)
  // console.log('filterRef', filterRef.current)

  return (
    <div className="App">
      <h1>SpacEx Launch programs</h1>
      <br />
      <div className='filter-and-satellite-wrapper'>
        <Filters selectedFilters={handleFilterSelectionClick} />
        <main>
          {isApiCalling 
            ? <h1>Please wait 🚀</h1> 
            : <React.Fragment>
              {launches.length
                ? launches.map(launch => (
                  <SatelliteCard
                    key={launch.flight_number}
                    img={launch.links.mission_patch}
                    missionName={launch.mission_name}
                    flightNumber={launch.flight_number}
                    launchYear={launch.launch_year}
                    missionId={launch.mission_id}
                    isLaunchSuccess={launch.launch_success}
                    isLandingSuccess={launch.rocket.first_stage.cores}
                  />))
                : <h1>Uh ah! no rocket found 😔</h1>}
              </React.Fragment>}
        </main>
      </div>
    </div>
  );
}

export default App;
