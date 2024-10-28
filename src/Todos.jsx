import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import axios from 'axios';

const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
};

const Todos = () => {
  const { data: todos, isLoading, isError, error } = useQuery(['todos'], fetchTodos);
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Todos List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
