import app from '../../../app'
import Helpers from './Helpers'

export default {
  app,

  // keep all users to be populated in this 'user' object
  user: {
    // id: 1
    user1Data: Helpers.createUser(1)
  },

  /**
   * keep all auth data to be populated in this 'auth' object
   * check generateAuthToken.js script for easy token generation
   */
  auth: {
    user1AuthData: Helpers.createAuth(
      1,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNyZWF0ZURhdGUiOiIyMDE5LTA2LTEzVDAwOjQxOjM5LjUwMVoiLCJpYXQiOjE1NjAzODY0OTl9.K8-vIbCID6f-AYIpFCQtLi4t49bBx36QuvD6nr6-qnk'
    )
  }
}
