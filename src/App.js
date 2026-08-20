import './App.css';
import { Route,Routes,BrowserRouter,Link } from 'react-router-dom';
// _____ FILES IMPORTS
import Layout from './components/layouts';
  // _____ copmonents
import HomeInterface from './components/homeComponent';
import FormInput from './components/TodoForm';

function App() {

  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Layout/>}>
                  <Route   index path='/' element ={<HomeInterface/>}/> 
                  <Route    path='/addtask' element ={<FormInput/>}/> 
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
