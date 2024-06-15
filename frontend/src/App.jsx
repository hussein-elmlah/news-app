import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {

  return (
    <>
      <div className="App" data-choose-theme>
        <RouterProvider router={router} />
        {/* <ProductsList></ProductsList> */}
      </div>
    </>
  )
}

export default App
