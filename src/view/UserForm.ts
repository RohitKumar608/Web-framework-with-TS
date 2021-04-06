import { View } from './View'
export class UserForm extends View {
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
}
