import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Routes,
  Router,
} from "react-router-dom";

import "./index.css";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";




const Index = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        // Logged In
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          displayName: userAuth.displayName
        }))
      }
      else {
        // Logged out
        dispatch(logout())
      }
    })
    return unsubscribe;
  },[dispatch])

  return(
    <>
      {!user ? (<LoginScreen />) : <App />}
    </>
  )
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index /> 
    },
    {
      path: "/profile",
      element: <ProfileScreen />
    }
  ]
);



const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
