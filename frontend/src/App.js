import "./App.css";
// react router v6
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
  UserComponent,
  Wishlist,
} from "./pages/index";
import ProductPage from "./pages/Products/ProductPage";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/userx" element={<UserComponent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/ProductPage" element={<ProductPage />} />

          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
