import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productStyle.css';


function ShowProduct() {



                    const [product, setProduct] = useState({}); 
    
                    useEffect(() => {
                        axios.get(`https://dummyjson.com/products/2`)
                        .then((res) => setProduct(res.data))
                        .catch((err) => console.log(err));
                    }, []);
    
                    


    return (
    <>
    
    <div className="containerw">
                <h1 className="text-center text-dark">Product Details</h1>
                <div className="cards container">
                {Object.keys(product).length > 0 ? (
                    <>
                    <img src={product.thumbnail} alt={product.title} />
                    <div className="cards-body">
                        <h5 className="cards-title">{product.title}</h5>
                        <h5 className="cards-title">{product.description}</h5>
                        <p className="cards-title">Price: ${product.price}</p>
                        <p className="cards-title">Discount Percentage: {product.discountPercentage} %</p>
                        <p className="cards-title">Brand: {product.brand}</p>
                        <p className="cards-title">Category: {product.category}</p>
                        <div className="thumbnail-container">
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Thumbnail ${index}`} className="thumbnail" />
                        ))}
                        </div>
                    </div>
                    </>
                ) : (
                    <p>isloading</p>
                )}
                </div>
            </div>
            </>
  )
}



export default ShowProduct;

