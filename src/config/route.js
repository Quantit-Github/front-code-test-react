import NotFound from "@views/notFound";
import LoginView from "@views/login"
import Dashboard from "@views/dashboard";
import TodoList from "@views/todos";


const routes = [
    {
        name: "main",
        path: '/',
        element: <LoginView/>
    },
    {
        name: "login",
        path: "/login",
        element: <LoginView/>
    },
    {
        name: "dashboard",
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        name: "todo",
        path: '/todo',
        element: <TodoList/>
    },
    {
        name: "notFount",
        path: "/*",
        element: <NotFound/>
    },
];

export default routes;
