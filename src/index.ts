import { UserForm } from './view/UserForm'
import { User } from './models/User'

const users = User.buildUser({ name: 'Rohit', age: 25 })
const root = document.getElementById('root')
if (root) {
  const userForm = new UserForm(root, users)
  userForm.render()
} else {
  throw new Error('Root element did not found')
}
