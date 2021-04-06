import { User } from '../models/User'

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel()
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-agr': this.handleSetAge,
      'click:.set-name': this.handleSetName,
    }
  }

  handleSetAge = (): void => {
    this.model.setRandomAge()
  }
  handleSetName = (): void => {
    const input = this.parent.querySelector('input')
    if (input && input.value) {
      this.model.set({ name: input.value })
    }
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()
    for (const key in eventsMap) {
      const [event, className] = key.split(':')
      fragment.querySelectorAll(className).forEach((element) => {
        element.addEventListener(event, eventsMap[key])
      })
    }
  }

  template(): string {
    return `
    <div>
      <h1>User Form</h1>
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>
      <input class='user-name' />
      <button class="set-name">Set Name</button>
      <button  class="set-agr">Set Random Age</button>
    </div>
  `
  }

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }
}
