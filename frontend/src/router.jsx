import { Outlet, createBrowserRouter } from "react-router-dom";


import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import NewsPage from "./pages/NewsPage/NewsPage";



function UserLayout() {

    return (
      <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </>
    )

}

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <NewsPage />
      },      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ]},
  ]);

export default router;