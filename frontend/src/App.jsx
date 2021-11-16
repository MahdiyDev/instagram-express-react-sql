import { Switch } from "react-router-dom";

/* Pages */
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

/* Routes */
import Private from "./routes/Private";
import Public from "./routes/Public";

function App() {
  return (
    <div className="App">
      <Switch>
        <Private path='/' component={Home} exact />
        <Private path='/profile' component={Profile} exact />
        <Public path='/signup' component={SignUp} />
        <Public path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
