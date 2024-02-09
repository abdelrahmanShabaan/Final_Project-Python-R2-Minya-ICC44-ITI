import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowProduct from './Pages/ShowProduct';
import NotFoundPage from './Pages/NotFoundPage';


function App() {
  return (
    
    
    
    
    <BrowserRouter>
      <Navbar />
    <Switch>

          <Route exact path={"/product"} component={ShowProduct} />
          <Route exact path={"/"} component={ShowProduct} />
          <Route exact path={"*"} component={NotFoundPage}/>


          </Switch>
    </BrowserRouter>



  );
}

export default App;
