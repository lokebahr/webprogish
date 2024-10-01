import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import NotFound from "./NotFound";  // Import the new NotFound component

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/compose-salad",  
        Component: ComposeSalad,
      },
      {
        path: "/view-order",  
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:uuid",  // Route to handle order confirmation with UUID
            Component: ViewOrder,
          }
        ]
      },
      {
        index: true,  // Default route for the home page
        element: <p>Welcome to my own salad bar</p>,
      },
      {
        path: "*",  // Catch-all route for undefined paths
        Component: NotFound,  // Show the NotFound component
      }
    ]
  },
]);

export default router;
