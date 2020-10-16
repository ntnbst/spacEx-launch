import React from 'react'
import './components.css'

const SatelliteCard = ({ img, missionName, flightNumber, launchYear, isLaunchSuccess, isLandingSuccess, missionId }) => {
  return (
    <div className='s-card'>
      <figure>
        <img className='sat-img' width={250} src={img} alt='satellite-logo' />
      </figure>
      <h3 style={{ color: '#465098' }}>{missionName} #{flightNumber}</h3>
      <h4>Mission Ids: { missionId.map((id, index) => <span>{id}{missionId.length > 1 && index !== missionId.length - 1 && ', '}</span>) }</h4>
      <h4>Launch Year: {launchYear}</h4>
      <h4>Successful Launch: {isLaunchSuccess !== null ? isLaunchSuccess.toString() : 'NA'}</h4>
      <h4>Successful Landing: {isLandingSuccess[0].land_success !== null ? isLandingSuccess[0].land_success.toString() : 'NA'}</h4>
    </div>
  )
}

export default SatelliteCard