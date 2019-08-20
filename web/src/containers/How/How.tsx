import React from 'react'
import './How.scss'
import { Link } from 'react-router-dom';

function How() {
  return (
    <div id='how-page'>
      <div className='container'>
        <h3>
          <strong>How it works:</strong>
        </h3>
        <p>
          Leverage SEO to market your service. This might prove valuable to a rental marketplace company
          because.
        </p>
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
                We designed out code to be re-useable and effecient to develop (as well as aestehtcially
                pleasing). Quality code is important to us.
              </p>
            </div>
              <Link to='/about'>
            <div className='call-action'>
              <h4>Who made this?</h4>
              <p>
                <strong>Using:</strong> React ts, SASS
              </p>
            </div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
