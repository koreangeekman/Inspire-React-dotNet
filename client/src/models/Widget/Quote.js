export class Quote {
  constructor(data) {
    this.content = data.content || 'Totally Uninspirational Content'
    this.author = data.author || 'Unknown Author'
    this.tags = data.tags || ["untagged"]
  }
}