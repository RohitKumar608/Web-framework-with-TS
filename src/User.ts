import { Eventing } from './models/Eventing'
import { Sync } from './models/Sync'

const rootUrl = 'http://localhost:3000'
interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
}
