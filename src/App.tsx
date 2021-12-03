import React, { useCallback, useState } from 'react';
import './App.css';


interface Todo{
  id: number;
  data: string;
  completed: boolean;
}


function App() {
  const [item, setitem] = useState<string>('');
  const [listitems, setlistitems] = useState<Todo[]>([]);
  const [error, seterror] = useState<string | null>(null);
  const [sort, setsort] = useState<boolean>(false);
  const [searchvalue, setsearchvalue] = useState<string>('');
  const [iterate, setiterate] = useState<Todo[]>([])


  const handleitem = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setitem(e.target.value);
  },[])

  const handlesubmit = (e: React.MouseEvent<HTMLElement>) => {
    if(item.length === 0){
      seterror('Empty note cannot be added! ') 
    }
    else { 
      const newitem: Todo = {
      id : new Date().getTime(),
      data: item,
      completed: false
      }
      setlistitems([...listitems,newitem])
      seterror(null);
      setitem('');
    }
      
  }
  
  const handlecomplete = (e: React.ChangeEvent<HTMLInputElement>, elem: number) => {
    console.log('checked ',e.target.type)
    const updatedlist:Todo[] = [...listitems].map((dat) => {
      if(dat.id === elem){
        dat.completed = !dat.completed
      }
      return dat
    })
    setlistitems(updatedlist)
    setsort(false);
  }

  const handledelete = (element: number): void => {
    console.log('here ist si ',element)
    setlistitems(listitems.filter(ele => ele.id !== element))
  }

  const handlesort = (e: React.MouseEvent<HTMLElement>):void => {
    if(!sort){
      const sorteditems: Todo[] =listitems.sort(function(a, b){
        let x = a.completed;
        let y = b.completed;
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
      setsort(true)
      setlistitems(sorteditems)
      console.log(sorteditems)
    }
  }

  const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setsearchvalue(e.target.value);
    // let originaldata: Todo[] = listitems;
    // if(!e.target.value){
    //   setlistitems(originaldata)
    // }
    // const filtereddata: Todo[] = listitems.filter(ele => ele.data.toLowerCase().includes(e.target.value.toLowerCase()))
    // setlistitems(filtereddata)
  }

  return (
    <div className="container-xl  w-screen  h-screen flex flex-col">
        {error && <div className='p-2 bg-red-400 text-center text-red-900'>{error}</div>}
      <div className='bg-pink-400  h-1/4 w-full flex flex-col justify-center items-center p-2 relative'>

          <div className=' w-full flex justify-center items-center p-2'>
            <input type='text' name='note' value={searchvalue} placeholder='search a todo item...' 
            className='sm:w-1/3 xs:w-1/3 outline-none rounded p-1  w-3/5' 
            onChange={handlesearch}
          />
          {/* <span 
            className='p-1 rounded rounded-bl-none rounded-tl-none 
            bg-gray-500 hover:bg-green-500 text-white'
            >
              search
          </span> */}

          </div>
          <div className=' w-full flex justify-center items-center p-2'>
          <input type='text' name='note' value={item} placeholder='type a todo item...' 
            className='sm:w-1/3 xs:w-1/3 outline-none rounded p-2 mr-2 w-3/5' onChange={handleitem}
          />
          <button type='submit' 
          className='p-2 rounded bg-red-500 hover:bg-green-500 text-white'
          onClick={handlesubmit}
          >Add Item</button>
          </div>
          

          <div 
            className='absolute bottom-0 left-3/7 transform 
            translate-x translate-y-1/2 z-2 bg-black text-white 
            px-2 py-1 cursor-pointer rounded'
            onClick={handlesort}
            >
              {sort ? 'sorted' :'sort by completed'}
          </div>

      </div>



      <div className='bg-gray-600 h-full w-full flex flex-col items-center pt-6 overflow-y-auto'>
          {listitems.length > 0 && listitems.filter((val) => {
            if(searchvalue === ''){
              return val
            }else if(val.data.toLowerCase().includes(searchvalue)){
              return val
            }
          }).map((element,index) => (
            <div key={index} className='flex w-full justify-center items-center'>
              <div className={`my-2 bg-white p-2 w-1/2 flex-wrap capitalize ${element.completed && 'line-through'}`}>{element.data}</div>
              <div className='p-2 bg-pink-300 cursor-pointer' onClick={() => handledelete(element.id)}>Delete</div>
              <input type='checkbox' className={`h-10 w-10  `} onChange={(e) => handlecomplete(e,element.id)} checked={element.completed} />
            </div>
          ))}
      </div>

    </div>
  );
}

export default App;
