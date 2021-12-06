import {makeAutoObservable,action, observable} from 'mobx';

export interface Todo{
    id: number;
    data: string;
    completed: boolean;
  }

class TodoStore{
    listitems: Todo[] = [];
    sort: boolean = false;
    item: string = '';
    error: string | null = null;
    searchvalue : string = '';
    constructor(){
        makeAutoObservable(this,{
            listitems: observable,
            item: observable,
            handledelete: action,
            handlesearch: action,
            // handleitem: action,
        }
    )
    }
    

    handledelete(element: number){
        const filtereditems = this.listitems.filter(ele => ele.id !== element);
        this.listitems = filtereditems;
    }

    // handlesort(): void{
    //     if(!this.sort){
    //         const sorteditems: Todo[] =this.listitems.sort(function(a, b){
    //           let x = a.completed;
    //           let y = b.completed;
    //           if (x < y) {return 1;}
    //           if (x > y) {return -1;}
    //           return 0;
    //         });
    //         this.sort = true;
    //         this.listitems = sorteditems;
    //         console.log('inside of store to sortr items ',sorteditems)
    //       }
    // }

    handlesubmit() {
        console.log('items inside store ', this.item)
        if(this.item.length === 0){
          this.error = 'Empty note cannot be added! '
        }
        else { 
          const newitem: Todo = {
          id : new Date().getTime(),
          data: this.item,
          completed: false
          }
          this.listitems = [...this.listitems,newitem]
          this.error = null;
          this.item = '';
        }
          
      }

      handlesearch(item: string){
        console.log('inside store search value ',item)
        this.searchvalue = item;
      }

    //   handleitem(item: string){
    //       console.log('inside store handle item', item);
    //       this.item = item;
    //      }
 
}

const store = new TodoStore()

export default store;