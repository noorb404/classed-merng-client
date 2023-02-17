import {BrowserRouter as Router , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TableHelp from './pages/TableHelp';


import 'semantic-ui-css/semantic.min.css';
import NavigationBar from './components/Navbar/NavigationBar';
import RegisterConfirm from './pages/RegisterConfirm';
import {AuthProvider} from './context/auth';
import {LoggedInRoute , LoggedOutRoute} from './util/AuthRoute';
import singlePost from './pages/SinglePost';
import Statistic from './pages/Statistics';
import Organizations from './pages/Organizations';
import GraphHelp from './pages/GraphHelp';
import AllUsers from './pages/AllUsers';

function App() {
  return (

    
    <AuthProvider>
      <Router>
        <NavigationBar />
        <LoggedOutRoute exact path='/' component={Home}/>
        <LoggedOutRoute exact path='/AllUsers' component={AllUsers}/>
        <LoggedInRoute exact path='/login' component={Login}/>
        <LoggedOutRoute exact path='/:userId/profile' component={Profile}/>
        <LoggedInRoute exact path='/Secret-Backdoor-Register' component={RegisterConfirm}/>
        <Route exact path='/posts/:postId' component={singlePost} />
        <Route exact path='/statistics' component={Statistic} />
        <Route exact path='/organizations' component={Organizations} />
        <Route exact path='/GraphHelp' component={GraphHelp} />
        <Route exact path='/TableHelp' component={TableHelp} />
      </Router>
    </AuthProvider>


  );
}

export default App;
