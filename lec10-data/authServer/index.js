const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = {
  username: 'password',
  U: 'P',
}

const users2 = {
  username: {password: 'password', tries: 0},
  u2: {password: 'p2', tries: 0},
  u: {password: 'p', tries: 0}
}

const wait = s => new Promise(resolve => setTimeout(resolve, s * 1000));

const exponentialDelay = user => wait(2 ** user.tries).then(() => user.password)

const auth2 = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).send('Missing username or password')
    if (!users2[username]) return res.status(403).send('User does not exist')
    const user = users2[username]
    if (!user.tries > 10) {
        return res.status(403).send("Too many tries, contact support staff")
    }
    const pass = await exponentialDelay(user)
    if (pass !== password) {
      user.tries++
      return res.status(403).send(`Incorrect password (${10 - user.tries} tries left)`)
    }
    return res.status(200).json({token: 'thisIsARealToken'}).send()
}

const app = express()
app.use(bodyParser.json())

app.post('*', (req, res) => {
  //console.log('req')
  //console.log(req)
  //console.log('res')
  //console.log(res)
  console.log(req.body)
  const {username, password} = req.body

  if (!username || !password) return res.status(400).send('Missing username or password')
  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) return res.status(403).send('User does not exist')
  if (users[username] !== password) return res.status(403).send('Incorrect password')

  // commented out for aync redux, lect 10
  // return res.status(200).send()
  return res.status(200).json({token: 'thisIsARealToken'}).send()
})

// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'There was a problem'))

const server = app.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)
