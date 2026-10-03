import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";

const App=()=> {
const apiKey = import.meta.env.VITE_APP_NEWS_API
const pageSize=15;

const [progress, setProgress] =useState(0)

 
    return (
      
        <>
          <BrowserRouter>
          <Navbar/>
          <LoadingBar
              height={3}
              color="#f11946"
              progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="us" category="general" />} />
            <Route  exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
            <Route  exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business"  pageSize={pageSize} country="us" category="business" />} />
            <Route  exact path="/sports"  element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
            <Route  exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="us" category="general" />} />
            <Route  exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
            <Route exact path="/technology"  element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
          </Routes>

   </BrowserRouter>
        </>
   
    )
    
  }
export default App

