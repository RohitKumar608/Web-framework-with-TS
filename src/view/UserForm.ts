import { View } from './View'
import { User, UserProps } from '../models/User'
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-agr': this.handleSetAge,
      'click:.set-name': this.handleSetName,
      'click:.save-user': this.handleSaveUser,
    }
  }
  handleSaveUser = (): void => {
    this.model.save()
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
    <div class='main'>
      <h1>User Form</h1>
      <div class='user-details'>
        <span>User name: ${this.model.get('name')}</span>
        <span>User age: ${this.model.get('age')}</span>
      </div>
      <div>
        <input placeholder='Enter user name' class='user-name' />
        <button class="set-name">Set Name</button>
        <button  class="set-agr">Set Random Age</button>
      </div>
      <button  class="save-user">Save User</button>
    </div>
  `
  }
}
