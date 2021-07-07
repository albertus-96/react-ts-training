export class Task {
  id: number
  title: string
  desc: string
  date: Date
  isDone: boolean

  constructor(title: string, desc: string, date: Date, isDone: boolean = false, id?: number) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.isDone = isDone;
  }
}
