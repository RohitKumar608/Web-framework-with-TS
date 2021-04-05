export class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-agr': this.handleSetAge,
      'click:.set-name': this.handleSetName,
    }
  }

  handleSetAge(): void {}
  handleSetName(): void {}

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
        <h1> User Form </h1>
        <input />
        <button>Click Here</button>
      </div>
    `
  }

  render(): void {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }
}
