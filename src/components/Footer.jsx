/* eslint-disable no-unused-vars */
import logo from '../assets/LOGO.svg'
import { Link } from 'react-router-dom'
import searchIcon from '../assets/searchIcon.svg'
import shoppingBag from '../assets/shoppingBagIcon.svg'
import { useLogic } from '../context/LogicContext'
import { useState } from 'react'

const Footer = () => {
  const { 
    language, 
    t, 
    handleSearchBarToggle, 
    navigateToHome,
    displayConfirmationMessageHandler,
    displayErrorMessageHandler,
    navigateTo
  } = useLogic();

  const [email, setEmail] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      displayConfirmationMessageHandler("You will receive emails with out latest offers and news.", "Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      displayErrorMessageHandler("Please enter your email address.", "Oops!");
    }
  }

  return (
    <footer className="bg-[#111111] p-6 md:p-10 flex flex-col gap-10">
      <div className="flex flex-row justify-between items-end">
        <img src={logo} alt="Essence Logo" className='w-35 md:w-30 lg:w-40 cursor-pointer select-none' onClick={navigateToHome} />
        <div className="flex flex-row items-center gap-6">
          <div className="p-1 hover:scale-120 transition-all duration-300 ease-in-out cursor-pointer" onClick={() => {handleSearchBarToggle()}}>
              <img src={searchIcon} className='w-5 m-1.5'/>
          </div>
          <div className="p-1 hover:scale-120 transition-all duration-300 ease-in-out cursor-pointer">
              <img src={shoppingBag} className='w-5 m-1.5' onClick={() => navigateTo("/cart")} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-top gap-10 mt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-medium">{t('shop')}</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/store" onClick={() => window.scrollTo(0, 0)}>{t('allProducts')}</Link>
            </li>
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/store/men" onClick={() => window.scrollTo(0, 0)}>{t('menStore')}</Link>
            </li>
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/store/women" onClick={() => window.scrollTo(0, 0)}>{t('womenStore')}</Link>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4 w-fit">
          <h3 className="text-white text-lg font-medium">{t('about')}</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>{t('ourMission')}</Link>
            </li>
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>{t('ourFounder')}</Link>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4 w-fit">
          <h3 className="text-white text-lg font-medium">{t('contact')}</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>{t('sendMessage')}</Link>
            </li>
            <li className="text-white text-sm opacity-70 hover:opacity-100 transition-all duration-300">
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>{t('returnItem')}</Link>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-lg font-medium mb-2">{t('newsletter')}</h3>
          <form className="flex flex-col md:flex-row gap-2" onSubmit={(e) => handleEmailSubmit(e)}>
            <input 
              type="email" 
              placeholder={t('emailAddress')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border border-white/30 text-white p-2 focus:outline-none focus:border-white transition-all duration-300 w-full md:w-auto flex-grow"
            />
            <button type='submit' className="bg-white cursor-pointer text-black px-4 py-2 hover:bg-white/90 transition-all duration-300 w-full md:w-auto">
              →
            </button>
          </form>
          <p className="text-white/70 text-xs mt-2">Subscribe to receive exclusive offers and updates. Unsubscribe anytime.</p>
        </div>
      </div>
      
      <div className="h-[1px] w-full bg-white/20 my-4"></div>
      
      <div className="flex flex-row justify-between items-center gap-4">
        <p className="text-white/70 text-sm">Copyright © {new Date().getFullYear()}</p>
        <p className="text-white/70 text-sm">{t('rights')}</p>
      </div>
      
    </footer>
  )
}

export default Footer