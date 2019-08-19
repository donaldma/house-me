const jwt = require('jsonwebtoken')
const ncp = require('copy-paste')

/**
 * generate tokens fast for creating a new users for test
 * 1 argument => userId
 * example.
 * node generateAuthToken 1
 */
let userId = process.argv[2]

if (!userId) {
  userId = 1
}

const token = jwt.sign(
  {
    userId: userId,
    createDate: new Date()
  },
  'generateAuthTokenSecret'
)

ncp.copy(token, () => {
  console.log(`Copied token ${token} clipboard`)
})
