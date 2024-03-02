import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root/Root.tsx";

const router = createBrowserRouter ([
  {
    path:'/*',
    element: <Root/>,
    children: [
      {
        path:'',
        element:''
      }
    ]
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>   
    </>
  )
}

export default App