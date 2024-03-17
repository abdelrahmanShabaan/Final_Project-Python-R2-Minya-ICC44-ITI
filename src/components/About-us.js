import React from 'react';
import "./AboutUsSection.css";

function AboutUsSection() {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="row g-4 image-grid">
                        <div className="col-md-6">
                            <div className="image-container">
                                <img className="img-fluid rounded" src="/mona-siswanto-be4eoee4who-unsplash.jpg" alt="About Us" />
                                <div className="overlay">
                                    <h3>Offer: 20% Off On Tank Tops</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</p>
                                    <a href="#" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image-container">
                                <img className="img-fluid rounded" src="/frank-uyt-den-bogaard-gb4E016nXow-unsplash.jpg" alt="About Us" />
                                <div className="overlay">
                                    <h3>Offer: 20% Off On Tank Tops</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</p>
                                    <a href="#" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image-container">
                                <img className="img-fluid rounded" src="/chelson-tamares-Azq_8FBflN0-unsplash.jpg" alt="About Us" />
                                <div className="overlay">
                                    <h3>Offer: 20% Off On Tank Tops</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</p>
                                    <a href="#" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image-container">
                                <img className="img-fluid rounded" src="/alexandra-gorn-WF0LSThlRmw-unsplash.jpg" alt="About Us" />
                                <div className="overlay">
                                    <h3>Offer: 20% Off On Tank Tops</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</p>
                                    <a href="#" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-5 container-background">
            <h1 className="mb-4">Why You Should Trust Us? Get Know About Us!</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row g-4 image-grid">
                        <div className="col-md-6">
                            <div className="grid-item">
                                <i className="fas fa-gem fa-3x text-primary"></i>
                                <h4>Quality Products</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut quam ac erat vehicula fermentum.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="grid-item">
                                <i className="fas fa-shipping-fast fa-3x text-primary"></i>
                                <h4>Fast Delivery</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut quam ac erat vehicula fermentum.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="grid-item">
                                <i className="fas fa-lock fa-3x text-primary"></i>
                                <h4>Secure Payments</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut quam ac erat vehicula fermentum.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="grid-item">
                                <i className="fas fa-headset fa-3x text-primary"></i>
                                <h4>24/7 Customer Support</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut quam ac erat vehicula fermentum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default AboutUsSection;
