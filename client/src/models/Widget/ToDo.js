export class ToDo {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.isCompleted = data.isCompleted || false
    this.creatorId = data.creatorId
    this.anchor = data.anchor
    this.edit = false
    this.createdAt = new Date(data.createdAt)
    this.createdAtDate = new Date(data.createdAt).toLocaleDateString('fr-CA')
    this.createdAtTime = new Date(data.createdAt).toLocaleTimeString()
    this.updatedAt = new Date(data.updatedAt)
    this.updatedAtDate = new Date(data.updatedAt).toLocaleDateString('fr-CA')
    this.updatedAtTime = new Date(data.updatedAt).toLocaleTimeString()
  }
}