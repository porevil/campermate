import {Observable} from 'rxjs/Observable';

export class ChecklistModel {

  checklist: any;
  checklistObserver: any;
  constructor(public title: string, public created_date: string,public items: any[]){
    this.items = items;
    console.log(' ChecklistModel current date :'+created_date);
    this.checklist = Observable.create(observer => {
      this.checklistObserver = observer;
    });

  }


  addItem(item): void {
    console.log('addItem on date:'+this.created_date);
    this.items.push({
      title: item,
      created_date : this.created_date,
      checked: false
    });

    this.checklistObserver.next(true);

  }

  removeItem(item): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index, 1);
    }    

    this.checklistObserver.next(true);

  }

  renameItem(item, title): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items[index].title = title;
    }

    this.checklistObserver.next(true);

  }

  setMemo(item,memo): void{
    console.log('setMemo : '+memo)
    let index = this.items.indexOf(item);
    if(index > -1){
      this.items[index].memo = memo;
    }

    this.checklistObserver.next(true);
  }

  setTitle(title): void {
    this.title = title;
    this.checklistObserver.next(true);
  }

  toggleItem(item): void {
    item.checked = !item.checked; 
    this.checklistObserver.next(true);
  }

}