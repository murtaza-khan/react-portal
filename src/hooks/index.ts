import { useMutation, useQuery } from "react-query";
import { TodosService } from '../services/todos/index';

const todoService = new TodosService();

/**
 * Perform post api call using useMutation hook to save data on server
 * @param history 
 */
const useCreateTodo = (history: any) => {
  // mutations are typically used to create/update/delete data or perform server side-effects. 
  return useMutation((todo: ITodo) => {
    return todoService.addTodo(todo);
  }, {
    onSuccess: () => {
      history.goBack();
    }
  })
};

/**
 * Perform api call using useQuery hook to fetch data from server
 */
const useTodos = () => {
  // A query can be used with any Promise based method (including GET methods) to fetch data from a server
  return useQuery('todos', todoService.fetchTodosList);
};

export { useCreateTodo, useTodos };
