// App.js
import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router';

// icons


// icons 
import TodoList from '../components/TodoList';
import TaskButton from '../components/TaskButton';
import AddTodoForm from '../components/AddTodoForm';
import Header from '../components/Header';
import { getAllTodo } from '../features/todo/todoSlice';


function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  
  const [editText, setEditText] = useState('');
   
  
  const {user} = useSelector((state) => state.auth)
  const {todoList} = useSelector((state) => state.todo);
  const [alltodo , setAllTodo] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=>{
    if(!user){
      navigate("/auth")
    }
  } , [])
  

  // fetch all todo
  useEffect(()=> {
    dispatch(getAllTodo())  
  } , [])
  

  // filter todo types
  useEffect(()=>{

    if(filter === "all"){
      setAllTodo([...todoList])
    }

    if(filter === "active"){
      setAllTodo([...todoList.filter((todo) => !todo.isCompleted)])
    }

    if(filter === "completed"){
      setAllTodo([...todoList.filter((todo) => todo.isCompleted)])
    }
    
  } , [filter , todoList]) 
 
  


  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('modern-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('modern-todos', JSON.stringify(todos));
  }, [todos]);




 

  // Delete todo
 
 

  // Save edit
  const saveEdit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

 
  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

 

 

  // Calculate stats
  const totalTodos = todoList.length;
  const completedTodos = todoList.filter((todo) => todo.isCompleted).length;
  const activeTodos = totalTodos - completedTodos;

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#a4b0be';
    }
  };





  return (
    <div className="app">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container">
        
        {/* Header */}
        <Header activeTodos={activeTodos} completedTodos={completedTodos}  />

        {/* Main Content */}
        <main className="main-content">
          
          {/* Add Todo Form */}
          <AddTodoForm todos={todos} setTodos={setTodos}  />

          {/* Filter Buttons */}
          <section className="filter-section">
            <div className="filter-buttons">
              <TaskButton filter={filter} setFilter={setFilter} text="all" items={totalTodos} />
              <TaskButton filter={filter} setFilter={setFilter} text="active" items={activeTodos} />
              <TaskButton filter={filter} setFilter={setFilter} text="completed" items={completedTodos} />
            </div>

            {completedTodos > 0 && (
              <button className="clear-completed" onClick={clearCompleted}> 
                Clear Completed
              </button>
            )}
          </section>

          {/* Todo List */}
          <div className="flex flex-col   gap-2 h-[50vh]  overflow-y-scroll   "> 
            <TodoList todoList={alltodo}     saveEdit={saveEdit}  editText={editText} setEditText={setEditText}    />
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>Made by • Md.Shakhawat Hossain</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;