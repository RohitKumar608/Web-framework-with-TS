import { AxiosPromise, AxiosResponse } from 'axios'

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K]
  set(update: T): void
  getAll(): T
}

interface HashId {
  id?: number
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface Events {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

export class Model<T extends HashId> {
  constructor(
    public attribute: ModelAttributes<T>,
    public events: Events,
    public sync: Sync<T>
  ) {}
  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attribute.get
  }

  set(data: T): void {
    this.attribute.set(data)
    this.events.trigger('change')
  }
  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number') {
      throw new Error('Can not fetch data without an id')
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data)
    })
  }

  get getAll() {
    return this.attribute.getAll
  }

  save(): void {
    this.sync.save(this.getAll()).then((response: AxiosResponse): void => {
      this.events.trigger('save')
    })
  }
}
