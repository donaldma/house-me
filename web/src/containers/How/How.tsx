import React from 'react'
import './How.scss'
import { Link } from 'react-router-dom'

function How() {
  return (
    <div id='how-page'>
      <div className='container'>
        <div className='title'>
          <h1>
            <strong>How it works:</strong>
          </h1><br/>
          <h3 className='grey-text'>
            Leverage SEO to market your service by funneling prospective renters through your platform to get
            the word out.
          </h3>
        </div>
      </div>
      <div id='dark-section'>
        <div className='container'>
          <div className='description-card'>
            <div className='main-text'>
              <h3>
                <strong>The architecture</strong>
              </h3>
              <p>
                The back-end api scrapes data directly off craigslist. We use a database to store the listings
                every time we scrape off craigslist and use it as a caching method that expires after an hour.
              </p>
            </div>

            <Link to='/about'>
              <div className='call-action'>
                <h4>Who made this?</h4>
                <p>
                  <strong>Using:</strong> Typescript, Node.js, Express, Knex, Postgresql, Puppeteer
                </p>
              </div>
            </Link>
          </div>
          <div className='description-card'>
            <div className='main-text'>
              <h3>
                <strong>The design:</strong>
              </h3>
              <p>
                Building in REACT ts, we designed based our design off Liv.rent and custom made all
                icons/illustrations.
              </p>
            </div>
            <Link to='/about'>
              <div className='call-action'>
                <h4>Who made this?</h4>
                <p>
                  <strong>Using:</strong> React ts, SASS
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
