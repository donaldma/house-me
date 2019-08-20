import React from 'react'

function How() {
  return (
    <div>
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
        <div className='description-card'>
          <div>
            <h4>
              <strong>The architecture</strong>
            </h4>
            <p>
              The back-end api scrapes data directly off craigslist. We use a database to store the listings
              every time we scrape off craigslist and use it as a caching method that expires after an hour.
            </p>
            <h4>
              <strong>Using:Typescript, Node.js, Express, Knex, Postgresql, Puppeteer </strong>
            </h4>
          </div>
        </div>
        <div className='description-card'>
          <div>
            <h4>
              <strong>The design:</strong>
            </h4>
            <p>
            We designed out code to be re-useable and effecient to develop (as well as aestehtcially pleasing). Quality code is important to us.
            </p>
            <h4>
              <strong>Using: React ts, SASS</strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How