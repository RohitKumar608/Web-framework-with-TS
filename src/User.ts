import axios, { AxiosResponse } from 'axios'
import { Eventing } from './models/Eventing'

interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  public events: Eventing = new Eventing()
  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName]
  }

  set(update: UserProps): void {
    this.data = {
      ...this.data,
      ...update,
    }
  }
}
