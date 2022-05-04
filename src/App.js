import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "./api";
import Preloader from "./components/Preloader";
import {createTodo, readTodos } from "./functions";
import { useNavigate } from 'react-router-dom'


function App() {
let navigate = useNavigate();

  const [todo, setTodo] = useState({ 
    title: '', 
    content:''
  })

  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  useEffect(()=>{
    let currentTodo = currentId !==0 ? todos.find(todo=>todo._id===currentId):{title:'',content:''}
    setTodo(currentTodo)
    // eslint-disable-next-line
  }, [currentId])

  useEffect(()=>{ 
    const fetchData = async() =>{
      const result = await readTodos();
      setTodos(result)
      // console.log([...result,result.title])
      // console.table(result)
    }
    fetchData()
  }, [currentId])


  const clear = ()=>{
    setCurrentId(0);
    setTodo({
      title: '', 
      content:''
    }) 
  }

  useEffect(()=>{
    const clearField = (e) =>{
      if(e.keyCode === 27){
        clear();
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  }, [])

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodo(todo)
      setTodo({...todos, title:result.title, content:result.content})
      // setTodo([...todos, result])  
      clear();
    }else{
      await updateTodo(currentId, todo)
      clear();
    }
  }

  
  // const fetchUser = async(id) =>{
  //   const result1 = await findUser(id);
  //   console.log(result1)
  // }
  
  const removeTodo = async(id) =>{
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter(todo => todo._id !== id);
    setTodos(todosCopy);
  }
  return (
    <div className="container">
        <div className="row">
          <pre>{JSON.stringify(todo)}</pre>
          <form className="col s12" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">title</i>
                <input id="icon_prefix" type="text" className="validate" value={todo.title} 
                onChange={
                    e=> setTodo({...todo,title:e.target.value})
                  }/>
                <label htmlFor="icon_prefix">Title</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">description</i>
                <input id="description" type="tel" className="validate" value={todo.content}
                onChange={
                    e=> setTodo({...todo,content:e.target.value})
                  }/>
                <label htmlFor="description">contetn</label>
              </div>
            </div>
            <div className="row right-aligh">
              <button className="waves-effect wave-light btn">Submit</button>
            </div>
          </form>
        </div>
        {
          !todos? <Preloader/>: todos.length>0 ?
          <ul className="collection">
            {todos.map(todo =>(
              <li key={todo._id} 
              onClick={()=> setCurrentId(todo._id)}
              className="collection-item">
                <div><h5>{todo.title}</h5><p>{todo.content}<a href="#!" className="secondary-content">
                    <i onClick={() => removeTodo(todo._id)} className="material-icons">delete</i></a></p>
                    
                </div>
              </li>
            ))}
          </ul> : <div><h5>Nothing to do</h5></div>
        }
    <button className="btn" onClick={() => {navigate("/login")}}> login</button>
    </div>
  );
}

export default App;
