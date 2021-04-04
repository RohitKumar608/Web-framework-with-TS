import { User } from './User'

const user = new User({ id: 1 })

user.events.on('click', () => {
  console.log('Its all about how to live')
})
user.events.trigger('click')
