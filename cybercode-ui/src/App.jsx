import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { useEffect } from "react";
import loadAuthFromCookies from "./utils/loadAuthFromCookies.js";
import { Toaster } from "react-hot-toast";

function App() {
  // Set login state on first load
  useEffect(() => {
    loadAuthFromCookies();
  }, []);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
