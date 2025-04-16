import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    // path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Navigate replace to='dashboard' />,
        // Component: Dashboard,
      },
      { path: "dashboard", Component: Dashboard },
      { path: "bookings", Component: Bookings },
      { path: "cabins", Component: Cabins },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "account", Component: Account },
    ],
  },
  { path: "login", Component: Login },
  { path: "*", Component: PageNotFound },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>

      <Toaster
        position='top-right'
        gutter={12}
        containerStyle={{ margin: ".5rem" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 4000 },
          style: {
            fontSize: "2rem",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-200)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
