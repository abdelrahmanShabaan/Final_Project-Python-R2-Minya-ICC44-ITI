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
import SuccessPage from "./pages/CartPage/SuccessPage";
import CancelPage from "./pages/CartPage/CancelPage";
import CheckoutPage from "./pages/CartPage/CheckoutPage";
import SellerOrderPage from "./pages/SellerOrderPage/SellerOrderPage";
import ShowBuyerProducts from "./pages/BuyersPage/Show Buyer Product/ShowBuyerProducts";
import Dashboard from "./pages/BuyersPage/Dashboard/Dashboard";
import AddBuyerProduct from "./pages/BuyersPage/Add Buyer Products/AddBuyerProduct";
import EditBuyerProducts from "./pages/BuyersPage/Edit Buyer Products/EditBuyerProducts";

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
            <Route path="/user" element={<UserComponent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route exact path="/success" component={SuccessPage} />
            <Route exact path="/cancel" component={CancelPage} />
            <Route path="/CheckoutPage" element={<CheckoutPage />} />
            <Route path="/SellerOrderPage" element={<SellerOrderPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/ShowBuyerProducts" element={<ShowBuyerProducts />} />
            <Route path="/AddBuyerProduct" element={<AddBuyerProduct />} />
            <Route
              path="/EditBuyerProducts/:id"
              element={<EditBuyerProducts />}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
