import React, { useEffect, useState } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }  from 'recharts';
import SlideBarBuyer from '../Home Panel/SlideBarBuyer';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './ShowBuyerProducts.css'

function ShowBuyerProducts(){

   
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('https://api-generator.retool.com/Vn5ZGU/data');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
  
  
  
    const loadData = async () => {
      try {
        const res = await axios.get("https://api-generator.retool.com/Vn5ZGU/data");
        setProducts(res.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
  
  
    const deleteRev = async (id) => {
      try {
        await axios.delete(`https://api-generator.retool.com/Vn5ZGU/data/${id}`);
        
        loadData();
        console.log("Delete successful");
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };
  
  
  
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const handleEditClick = (id) => {
    navigate(`/EditBuyerProducts/${id}`); // Use navigate to go to the edit page
  };
  

            
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)  }


return(
    <>
    
    <div className='grid-containerwa'>
    <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>


    <div className="product-list-container-buyer">
    <h1 className='buyerheader'>Product List</h1>
    <table>
    <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Seller ID</th>
          <th>Product ID</th>
          <th>Customer ID</th>
          <th>Inventory</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.sellerid}</td>
            <td>{product.productid}</td>
            <td>{product.customerid}</td>
            <td>{product.inventory}</td>
            <td>
            <button className="primarys-btn " style={{ margin: '2px' }} onClick={() => handleEditClick(product.id)}> Edit </button>
            <button  className="dangerssq-btn " style={{ margin: '2px' }} onClick={() => deleteRev(product.id)}> Delete   </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

    </div>



    </>
    )

}


export default ShowBuyerProducts