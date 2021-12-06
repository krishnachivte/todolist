import { observer } from 'mobx-react';
import React from 'react';
import './App.css';
import Listing  from './Listing';
import store from './store';
import {Todo} from './store';


// interface Todo{
//   id: number;
//   data: string;
//   completed: boolean;
// }


function App() {
  // const [item, setitem] = useState<string>('');
  // const [listitems, setlistitems] = useState<Todo[]>([]);
  // const [error, seterror] = useState<string | null>(null);
  // const [sort, setsort] = useState<boolean>(false);
  // const [searchvalue, setsearchvalue] = useState<string>('');


  // const handleitem = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setitem(e.target.value);
  // },[])

  // const handlesubmit = (e: React.MouseEvent<HTMLElement>) => {
  //   if(item.length === 0){
  //     seterror('Empty note cannot be added! ') 
  //   }
  //   else { 
  //     const newitem: Todo = {
  //     id : new Date().getTime(),
  //     data: item,
  //     completed: false
  //     }
  //     setlistitems([...listitems,newitem])
  //     seterror(null);
  //     setitem('');
  //   }
      
  // }
  
  // const handlecomplete = (e: React.ChangeEvent<HTMLInputElement>, elem: number) => {
  //   console.log('checked ',e.target.type)
  //   const updatedlist:Todo[] = [...listitems].map((dat) => {
  //     if(dat.id === elem){
  //       dat.completed = !dat.completed
  //     }
  //     return dat
  //   })
  //   setlistitems(updatedlist)
  //   setsort(false);
  // }

  // const handledelete = (element: number): void => {
  //   setlistitems(listitems.filter(ele => ele.id !== element))
  // }

  const handlesort = () => {
    if(!store.sort){
      const sorteditems: Todo[] =store.listitems.sort(function(a, b){
        let x = a.completed;
        let y = b.completed;
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
      store.sort = (true)
      store.listitems = sorteditems
      console.log(sorteditems)
    }
  }

  // const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value)
  //   setsearchvalue(e.target.value);
  // }

  return (
    <div className="container-xl  w-screen  h-screen flex flex-col">
        {store.error && <div className='p-2 bg-red-400 text-center text-red-900'>{store.error}</div>}
      <div className='bg-pink-400  h-1/4 w-full flex flex-col justify-center items-center p-2 relative'>

          <div className=' w-full flex justify-center items-center p-2'>
            <input type='text' name='note' value={store.searchvalue} placeholder='search a todo item...' 
            className='sm:w-1/3 xs:w-1/3 outline-none rounded p-1  w-3/5' 
            onChange={(e) => (store.handlesearch(e.target.value))}
          />

          </div>
          <div className=' w-full flex justify-center items-center p-2'>
          <input type='text' name='note' value={store.item} placeholder='type a todo item...' 
            className='sm:w-1/3 xs:w-1/3 outline-none rounded p-2 mr-2 w-3/5' onChange={(e) => (
              store.item = e.target.value
            )}
          />
          <button type='submit' 
          className='p-2 rounded bg-red-500 hover:bg-green-500 text-white'
          onClick={() => {store.handlesubmit()}}
          >Add Item</button>
          </div>
          

          <div 
            className='absolute bottom-0 left-3/7 transform 
            translate-x translate-y-1/2 z-2 bg-black text-white 
            px-2 py-1 cursor-pointer rounded'
            onClick={() => handlesort()}
            >
              {store.sort ? 'sorted' :'sort by completed'}
          </div>

      </div>



      <Listing />

    </div>
  );
}

export default observer(App);
