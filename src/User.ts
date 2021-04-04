import { Eventing } from './models/Eventing'
import { Sync } from './models/Sync'
import { Attributes } from './models/Attributes'
import { AxiosResponse } from 'axios'
const rootUrl = 'http://localhost:3000/users'
interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  public attribute: Attributes<UserProps>

  constructor(attr: UserProps) {
    this.attribute = new Attributes<UserProps>(attr)
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attribute.get
  }

  save(data: UserProps): void {
    this.attribute.set(data)
    this.events.trigger('change')
  }
  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number') {
      throw new Error('Can not fetch data without an id')
    }
    this.sync.fetch(id).then((res: AxiosResponse) => {
      this.save(res.data)
    })
  }
}
