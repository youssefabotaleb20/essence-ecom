import { Route, Routes } from "react-router-dom";
import { LogicProvider } from './context/LogicContext';
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Store from './components/Store.jsx';
import Product from './components/Product.jsx';
import Footer from './components/Footer.jsx'
import NotFound from './components/NotFound.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import SearchBar from './components/SearchBar.jsx'
import ConfirmMessage from "./components/ConfirmMessage.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import WelcomeMessage from "./components/WelcomeMessage.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import { useEffect, useState } from "react";

function AppContent() {
  const [isWelcomeMessageDisplayed, setIsWelcomeMessageDisplayed] = useState(() => {
    return sessionStorage.getItem('welcomeMessageShown') !== 'true';
  });
  useEffect(() => {
    if (!isWelcomeMessageDisplayed) return;
    setTimeout(() => {
      const box = document.getElementById('WelcomeBox');
      if (box) {
        box.classList.remove('animate__backInDown');
        box.classList.add('animate__backOutDown');
      }
    }, 5000);
    setTimeout(() => {
      setIsWelcomeMessageDisplayed(false);
      sessionStorage.setItem('welcomeMessageShown', 'true');
    }, 5700);
  }, [isWelcomeMessageDisplayed]);

  return (
    <div className='flex flex-col min-h-screen scroll-smooth select-none'>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/store/:target"} element={<Store />}></Route>
        <Route path={"/store"} element={<Store />}></Route>
        <Route path={"/product/:id"} element={<Product />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route path={"/contact"} element={<Contact />}></Route>
        <Route path={"/cart"} element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <MobileMenu />
      <SearchBar />
      <ConfirmMessage />
      <ErrorMessage />
      {isWelcomeMessageDisplayed && <WelcomeMessage />}
    </div>
  )
}

function App() {
  return (
    <LogicProvider>
      <AppContent />
    </LogicProvider>
  )
}

export default App
