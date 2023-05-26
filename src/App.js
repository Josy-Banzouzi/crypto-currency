import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
  Navbar,
  HomePage,
  Cryptocurrencies,
  Exchange,
  CryptoDetails,
  News,
} from "./components";

import "./assets/css/App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies/>}
              />
              <Route exact path="/exchanges" element={<Exchange/>} />
              <Route exact path="/news" element={<News/>} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                Cryptoverse <br/>
                All droit reserver
            </Typography.Title>
            <Space>
                <Link to={"/"}>Home</Link>
                <Link to={"/exchanges"}>Exchanges</Link>
                <Link to={"/news"}>News</Link>
            </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
