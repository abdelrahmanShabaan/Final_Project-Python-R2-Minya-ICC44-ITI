import "./App.css";
import React, { useEffect, useState } from "react";
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
import ShowSellerProducts from "./pages/SellersPage/ShowSellerProducts/ShowSellerProducts";
import Dashboard from "./pages/SellersPage/Dashboard/Dashboard";
import AddBuyerProduct from "./pages/SellersPage/AddSellerProducts/AddSellerProducts";
import EditSellerProducts from "./pages/SellersPage/EditSellerProducts/EditSellerProducts";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HeaderSeller from "./components/HeaderSeller/HeaderSeller";
import { useAuth } from "./pages/context/AuthContext";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import Terms from "./pages/Terms/Terms"
import NewFooter from "./components/NewFooter/NewFooter"
import ShowSellerReviews from "./pages/SellersPage/ShowSellerReviews/ShowSellerReviews";
import ShowSellerCategories from "./pages/SellersPage/ShowSellerCategories/ShowSellerCategories";
import AddSellerProducts from "./pages/SellersPage/AddSellerProducts/AddSellerProducts";
import ShowSellerOrders from "./pages/SellersPage/ShowSellerOrders/ShowSellerOrders";
import UserProfile from "./pages/UserPersonalProfilePage/UserProfile";
import EditSellerCategories from "./pages/SellersPage/EditSellerCategories/EditSellerCategories";
function App() {

  const {
    setIsLoggedInContext,
    setRoleContext,
    isLoggedInContext,
    roleContext } = useAuth();

  // const [userRole, setUserRole] = useState('');

  // useEffect(() => {
  //   const userRole = fetchUserRole();
  //   setUserRole(userRole);
  // }, []);

  // function fetchUserRole() {
  //   const user = JSON.parse(localStorage.getItem("login"));
  //   if (user) {
  //     return user.role;
  //   }
  //   return '';
  // }

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          {roleContext === 'seller' ? <HeaderSeller /> : <Header />}
          <Sidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/user" element={<UserComponent />} />
            <Route path="/VerificationPage" element={<VerificationPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route exact path="/success" component={SuccessPage} />
            <Route exact path="/cancel" component={CancelPage} />
            <Route path="/CheckoutPage" element={<CheckoutPage />} />
            {/* <Route path="/SellerOrderPage" element={<SellerOrderPage />} /> */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/ShowSellerCategories" element={<ShowSellerCategories />} />
            <Route path="/ShowSellerProducts" element={<ShowSellerProducts />} />
            <Route path="/ShowSellerReviews" element={<ShowSellerReviews />} />
            <Route path="/ShowSellerOrders" element={<ShowSellerOrders />} />
            <Route path="/AddSellerProducts" element={<AddSellerProducts />} />
            <Route path="/EditSellerProducts/:id" element={<EditSellerProducts />} />
            <Route path="/EditSellerCategories/:id" element={<EditSellerCategories />} />
            <Route path='/user/:activepage' element={<UserProfile/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Footer />
          {/* <NewFooter /> */}
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
