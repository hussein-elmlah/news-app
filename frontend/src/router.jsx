import { Outlet, createBrowserRouter } from "react-router-dom";


import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import LoginHistory from "./pages/LoginHistory/LoginHistory";
import AllSourcesPage from "./pages/AllSourcesPage/AllSourcesPage";
import TopFiveSourcesPage from "./pages/TopFiveSourcesPage/TopFiveSourcesPage";

function UserLayout() {

    return (
      <>
        <Navbar />
        <div className="container" style={{ paddingTop: "56px", minHeight: "calc(100vh - 72px)" }}>
        <Outlet />
      </div>
      <Footer />
      </>
    )

}

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },  
      {
        path: "/sources",
        element: <AllSourcesPage />
      },   
      {
        path: "/history",
        element: <LoginHistory />
      },
      {
        path: "/top-subscribed",
        element: <TopFiveSourcesPage />
      },
      {
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