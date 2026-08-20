import React from 'react'
import './index.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'
export default function App() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/experience' element={<Experience />}/>
      <Route path='/projects' element={<Projects />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}
