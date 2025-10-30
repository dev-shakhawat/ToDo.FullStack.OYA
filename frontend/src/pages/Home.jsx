// App.js
import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router';

// icons


// icons 
import TodoList from '../components/TodoList';
import TaskButton from '../components/TaskButton';
import AddTodoForm from '../components/AddTodoForm';
import Header from '../components/Header';


function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
   
  
  
  
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate();



  useEffect(()=>{
    if(!user){
      navigate("/auth")
    }
  } , [])

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




  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

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

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Handle file upload


  // Remove media


  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
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
          <section className="todo-list-section">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"> 
                </div>
                <h3>No tasks found</h3>
                <p>
                  {filter === 'all' 
                    ? "Add a new task to get started!" 
                    : filter === 'active' 
                    ? "No active tasks - great job!"
                    : "No completed tasks yet."
                  }
                </p>
              </div>
            ) : (
              <div className="todo-list">
                {filteredTodos.map(todo => <TodoList todo={todo} deleteTodo={deleteTodo} setEditText={setEditText} cancelEdit={cancelEdit} editText={editText} saveEdit={saveEdit} startEditing={startEditing} toggleTodo={toggleTodo} getPriorityColor={getPriorityColor} editingId={editingId} key={todo.id} onToggle={toggleTodo} onDelete={deleteTodo}  /> )}
              </div>
            )}
          </section>
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