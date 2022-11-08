import Router from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  return (
    <div>
      <RouterProvider router={Router} />
      <ToastContainer />
    </div>
  );
}

export default App;
