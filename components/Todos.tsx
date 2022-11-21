import { useState, useEffect } from 'react';
import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from 'types_db';
import { Todo } from 'types';

export const supabase = createBrowserSupabaseClient<Database>();

export default function Todos({ user }: { user: User }) {
  const [todos, setTodos] = useState<any[]|undefined>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [errorText, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
    if (error) 
      console.log('error', error);
    else 
      setTodos(todos as any[]|undefined);
  }
  const addTodo = async (taskText:string) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id })
        .select('*')
        .single();
      if (error) 
        setError(error.message);
      else 
        setTodos(todos?[...todos, todo]:[]);
    }
  }

  const deleteTodo = async (id:string) => {
    try {
      await supabase.from('todos').delete().eq('id', id);
      setTodos(todos?.filter((x:Todo) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setError('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="bg-slate-900" onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-neutral-300 shadow overflow-hidden rounded-md">
        <ul>
          {todos?.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Todo = ({ todo, onDelete }:{todo:Todo,onDelete:any}) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .select('*')
        .single()
      if (error) {
        throw new Error(error.message);
      }
      setIsCompleted(data?(data as Todo).is_complete:false);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    
    <li
      onClick={(e) => {
        e.preventDefault()
        toggle()
      }}
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{todo.task}</div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : false}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 border-amber-900 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

const Alert = ({text}:{text:string}) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
