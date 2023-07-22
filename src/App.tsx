import { Fragment, useState, useRef } from 'react'

type FromElement = React.FormEvent<HTMLFormElement>
interface ITask{
  nombre: string;
  done: boolean;
}

function App(): JSX.Element{

  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FromElement) =>{
    e.preventDefault()
    addTask(newTask)

    setNewTask('')
  }

  const addTask = (nombre: string): void =>{
    const newTasks: ITask[] = [...tasks,{nombre, done:false}]

    setTasks(newTasks)
    setNewTask('')
    taskInput.current?.focus()
   
  }
  
  const terminarTarea = (i: number): void  => {

    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const eliminarTarea = (i: number):void  => {

    const newTasks: ITask[] = tasks.filter((t: ITask, index: number) => index !== i);
    setTasks(newTasks);
  }

  return (  
    <main className='flex flex-col p-5'>
      <form  className='mb-5 flex flex-col m-1 bg-slate-100 p-10' onSubmit={handleSubmit}>
        <input
          ref={taskInput}
          className=' shadow p-2 mb-2'
          type="text" onChange={e => setNewTask(e.target.value)} value={newTask}/>
          <button type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >

            Guardar
          </button>
      </form>
      {
        tasks.map((t: ITask, i: number) =>(
          <div
            key={i}
            className={` cursor-pointer p-4 ${t.done ? 'bg-green-500 line-through':"bg-slate-700"} flex justify-between items-center rounded m-2`}>
            <h1 
              onClick={() => terminarTarea(i)}
             className=' text-2xl text-white font-bold'>{t.nombre}</h1>
            <button
              onClick={() => eliminarTarea(i)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
              Eliminar
            </button>
          </div>
        ))  
      }
    </main>
  )
}

export default App
