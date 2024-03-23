import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsStarFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import SlideBarBuyer from "./SlideBarBuyer";
import "./dashboard.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const {
    setIsLoggedInContext,
    setRoleContext,
    isLoggedInContext,
    roleContext } = useAuth();

  const navigate = useNavigate();
  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      setIsLoggedInContext(true);
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "customer") {
        setRoleContext("customer");
        navigate("/");
      }
    } else {
      navigate("/user");
    }
  }, []);
  /** End of Redirection */
  
  
  
  const data = [
    {
      name: "Products",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Category",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Customers",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Brands",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Reviews",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Stock",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Discount",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  /** Count Function for products  */

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/products/");
        setProductCount(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductCount();
  }, []);

  /**end function count */

  /** Count Function for category  */

  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/categories/");
        setCategoryCount(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductCount();
  }, []);

  /**end function category */

  /** Count Function for users  */

  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/");
        setUsersCount(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductCount();
  }, []);

  /**end function users */

  /** Count Function for Reviews  */

  const [reviewCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/review/");
        setReviewsCount(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductCount();
  }, []);

  /**end function Reviews */

  return (
    <>
      <div className="home-page-container">
        <div className="grid-container">
          {/* <Header OpenSidebar={OpenSidebar}/> */}
          <SlideBarBuyer
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />

          <main className="main-container">
            <div className="main-title">
              <h3>DASHBOARD</h3>
            </div>

            <div className="main-cards">

              <div className="card">
              <Link to="/ShowSellerProducts">
                <div className="card-inner">
                  <h3>PRODUCTS</h3>
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <h1 style={{color: "#FFFFFF"}}>{productCount}</h1>
                </Link>
              </div>

              <div className="card">
              <Link to="/ShowSellerCategories">
                <div className="card-inner">
                  <h3>CATEGORIES</h3>
                  <BsFillGrid3X3GapFill className="card_icon" />
                </div>
                <h1 style={{color: "#FFFFFF"}}>{categoryCount}</h1>
                </Link>
              </div>

              <div className="card">
                <div className="card-inner">
                  <h3>CUSTOMERS</h3>
                  <BsPeopleFill className="card_icon" />
                </div>
                <h1 style={{color: "#FFFFFF"}}>{usersCount}</h1>
              </div>
              <div className="card">
              <Link to="/ShowSellerReviews">
                <div className="card-inner">
                  <h3>Reviews</h3>
                  <BsStarFill className="card_icon" />
                </div>
                <h1 style={{color: "#FFFFFF"}}>{reviewCount}</h1>
                </Link>
              </div>
            </div>



            <div className="charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>






          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
