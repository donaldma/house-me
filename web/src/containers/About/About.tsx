import React from 'react'
import './About.scss'

const dlIcon: string = '/img/download-icon.svg'
const alexImg: string = '/img/Alex-working.svg'
const donaldImg: string = '/img/Donald-working.svg'
const donaldResume: string = 'Donald Ma Resume.pdf'
const alexResume: string = 'Resume_Alexander_Kim.pdf'

function About() {
  return (
    <div id='about-page'>
      <div className='container'>
        <div id='title'>
          <h1 className='grey-text'>
            <strong>We're applying for Liv.rent / Machobear</strong>
          </h1>
          <h1 className='thin-font'>Junior - Intermediate developers</h1>
        </div>
        <div className='row'>
          <div className='find-out col-md-6'>
          <a href={alexResume} target='_blank'><img src={alexImg} alt='alex-working-front-end' className='illustration' /></a>
            <h3>
              <strong>Alexander Kim</strong>
            </h3>
            <h4>Junior Full-stack. UX</h4>
            <div className='links'>
              <p>
                <a href={alexResume} target='_blank'>
                  <strong>
                    view resume <img className='dlIcon' src={dlIcon} alt='download-icon' />
                  </strong>
                </a>
                <br />
                <a href='mailto:alexkim.347@gmail.com'>alexkim.347@gmail.com</a> <br/><a href='https://github.com/oklex'>Github/oklex</a> - <a href='https://www.linkedin.com/in/akim-97/'>LinkedIn</a> - <a href='https://romantic-borg-2dc9e4.netlify.com'>Personal</a>
              </p>
            </div>
          </div>
          <div className='find-out col-md-6'>
          <a href={donaldResume} target='_blank'><img src={donaldImg} alt='donald-working-back-end' className='illustration' /></a>

            <h3>
              <strong>Donald Ma</strong>
            </h3>
            <h4>Intermediate Full-stack</h4>
            <div className='links'>
              <p>
                <a href={donaldResume} target='_blank'>
                  <strong>
                    view resume <img className='dlIcon' src={dlIcon} alt='download-icon' />
                  </strong>
                </a>
                <br />
                <a href='mailto:donald.ma@hotmail.ca'>donald.ma@hotmail.ca</a><br/> <a href='https://github.com/donaldma'>Github/donaldma</a> - <a href='https://www.linkedin.com/in/donaldma/'>LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About
