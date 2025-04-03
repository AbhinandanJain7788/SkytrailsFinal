

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <h1>Welcome to SkyTrails</h1>
     
      
      
      <div className="cards-container">
        <div className="card">
          <h2>Explore Countries</h2>
          <p>Discover beautiful destinations around the world.</p>
          <Link to="/country" className="card-button">Explore</Link>
        </div>
        
        <div className="card">
          <h2>Indian Blog Posts</h2>
          <p>Get travel tips, insights, and more.</p>
          <Link to="/blog" className="card-button">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

