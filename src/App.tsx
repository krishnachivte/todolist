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
  const [error, seterror] = useState<string | null>(null)


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
  }

  const handledelete = (element: number): void => {
    console.log('here ist si ',element)
    setlistitems(listitems.filter(ele => ele.id !== element))
  }


  return (
    <div className="container-xl  w-screen  h-screen flex flex-col">
        {error && <div className='p-2 bg-red-400 text-center text-red-900'>{error}</div>}
      <div className='bg-pink-400  h-1/4 w-full flex justify-center items-center p-2'>

          <input type='text' name='note' value={item} placeholder='type a todo item...' 
            className='sm:w-1/3 xs:w-1/3 outline-none rounded p-2 mr-2 w-3/5' onChange={handleitem}
          />
          <button type='submit' 
          className='p-2 rounded bg-red-500 hover:bg-green-500 text-white'
          onClick={handlesubmit}
          >Add Item</button>
      </div>

      <div className='bg-gray-600 h-full w-full flex flex-col items-center pt-4 overflow-y-auto'>
          {listitems.length > 0 && listitems.map((element,index) => (
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
