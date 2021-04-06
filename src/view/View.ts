import { User } from '../models/User'

export abstract class View {
  abstract eventsMap(): { [key: string]: () => void }
  abstract template(): string

  constructor(public parent: Element, public model: User) {
    this.bindModel()
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
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
  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }
}
