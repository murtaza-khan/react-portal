import React, { useState } from 'react';
import { useCreateTodo } from 'src/hooks';
import { useHistory } from 'react-router-dom';

export const CreateTodo: React.FC = () => {

  const initialFormState = {
    userId: '',
    id: 0,
    completed: '',
    title: ''
  };

  const [, setFormState] = useState<ITodo>(initialFormState);
  const history = useHistory();
  // Data is saved on the server using custom hook
  const mutation: any = useCreateTodo(history);

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          <input placeholder="Add Todo"
            onChange={(event) => {
              setFormState(state => ({ ...state, title: event.target.value }))
            }}></input>
          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry', userId: '', completed: '' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}
