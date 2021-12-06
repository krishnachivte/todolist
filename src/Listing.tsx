import React from 'react'
import store, { Todo } from './store'

export function Listing() {
    

    const handlecomplete = (e: React.ChangeEvent<HTMLInputElement>, elem: number) => {
    console.log('checked ',e.target.type)
    const updatedlist:Todo[] = [...store.listitems].map((dat) => {
      if(dat.id === elem){
        dat.completed = !dat.completed
      }
      return dat
    })
    store.listitems = updatedlist;
    store.sort = false;
  }

    return (
        <div className='bg-gray-600 h-full w-full flex flex-col items-center pt-6 overflow-y-auto'>
          {store.listitems.length > 0 && store.listitems.filter((val) => {
            if(store.searchvalue === ''){
              return val
            }else if(val.data.toLowerCase().includes(store.searchvalue)){
              return val
            }else{
              return null
            }
          }).map((element,index) => (
            <div key={index} className='flex w-full justify-center items-center'>
              <div className={`my-2 bg-white p-2 w-1/2 flex-wrap capitalize ${element.completed && 'line-through'}`}>{element.data}</div>
              <div className='p-2 bg-pink-300 cursor-pointer' onClick={() => store.handledelete(element.id)}>Delete</div>
              <input type='checkbox' className={`h-10 w-10  `} onChange={(e) => handlecomplete(e,element.id)} checked={element.completed} />
            </div>
          ))}
      </div>
    )
}
