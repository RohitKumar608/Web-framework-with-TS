import { User } from './User'

const user = new User({ id: 2 })

user.on('change', () => {
  console.log(user)
})

user.fetch()
