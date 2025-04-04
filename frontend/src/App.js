import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/loginorRegister/Login';
import Register from './components/loginorRegister/Register';
import DashBoard from './components/stocks/DashBoard';
import Interface from './Interface';
import Chatbot from './components/Chatbot/Chatbot';
function App() {
  let router= createBrowserRouter([
    {
      path:'',
      element:<Interface/>,
      children:[
        {
          path:'/',
          element:<Chatbot/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>,
          
        },
        {
         path:'/:symbol/dashboard',
         element:<DashBoard /> 
        }
      ]
   } 
  ])


  const fallbackElement='hello '
  return (
    <div>
    <RouterProvider router={router} fallbackElement={fallbackElement}  />
    </div>
  );
}

export default App;
