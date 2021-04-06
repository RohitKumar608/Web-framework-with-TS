import { UserForm } from './view/UserForm'
import { User } from './models/User'

const users = User.buildUser({ name: 'Rohit', age: 25 })
const userForm = new UserForm(document.getElementById('root'), users)

userForm.render()
