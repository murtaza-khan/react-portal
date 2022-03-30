import React from 'react';
import { Link } from 'react-router-dom';
import { useTodos } from 'src/hooks';

export const Todos: React.FC = () => {
  // Data is being fetched from server using custom hook
  const { isLoading, data } = useTodos();

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <Link to='/create'>Create Todo</Link>
      <ul>
        {data.data.map((todo: ITodo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
