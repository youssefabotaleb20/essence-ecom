import { Link } from 'react-router-dom'
import { useLogic } from '../context/LogicContext'
import logo from '../assets/LOGO.SVG'
import searchIcon from '../assets/searchIcon.svg'
import shoppingBag from '../assets/shoppingBagIcon.svg'
import menuIcon from '../assets/menuIcon.svg'

const Header = () => {
    const { language, t, changeLanguage, navigateToHome, isMobile, handleMobileMenuToggle, handleSearchBarToggle, navigateTo } = useLogic();
    return (
        <header className="bg-black flex justify-between items-center py-6 px-5 md:py-10 md:px-10 xl:py-10 xl:px-14 font-helvetica md:font-light z-50 relative">
            <div id='HeaderGradient' className='absolute top-[100%] left-0 w-full h-[.5px] bg-white/80 z-50'></div>
            <section className='flex flex-row gap-10 sm:items-center'>
                <img src={logo} alt="" className='w-35 md:w-30 lg:w-40 cursor-pointer select-none' onClick={navigateToHome} />
                {!isMobile && 
                    <select defaultValue={language} onChange={(e) => {changeLanguage(e.target.value)}} className="select select-ghost focus:outline-none focus:bg-transparent hover:border-b-white transition-all duration-300 ease-in-out cursor-pointer px-3 text-white focus:text-white/70">
                        <option value={"en"}>EN</option>
                        <option value={"es"}>ES</option>
                    </select>
                }
            </section>
            <section>
                <nav>
                    <ul className="flex flex-row gap-2 sm:gap-12 md:gap-16 lg:gap-18 items-center">
                        {!isMobile && (
                            <>
                                <li className="text-white border-b-transparent border-b-1 hover:border-b-white transition-all duration-300 ease-in-out">
                                    <Link to="/store">{t('shop')}</Link>
                                </li>
                                <li className="text-white border-b-transparent border-b-1 hover:border-b-white transition-all duration-300 ease-in-out">
                                    <Link to="/about">{t('about')}</Link>
                                </li>
                                <li className="text-white border-b-transparent border-b-1 hover:border-b-white transition-all duration-300 ease-in-out">
                                    <Link to="/contact">{t('contact')}</Link>
                                </li>
                            </>
                        )}
                        <li className="p-1 hover:scale-120 transition-all duration-300 ease-in-out cursor-pointer">
                            <img src={searchIcon} className='w-5 m-1.5' onClick={handleSearchBarToggle}/>
                        </li>
                        <li className="p-1 hover:scale-120 transition-all duration-300 ease-in-out cursor-pointer">
                            <img src={shoppingBag} className='w-5 m-1.5' onClick={() => navigateTo("/cart")}/>
                        </li>
                        {isMobile && (
                            <li id='HamburgerMenu' className="p-1 hover:scale-120 transition-all duration-300 ease-in-out cursor-pointer">
                                <img src={menuIcon} className='w-7 m-1.5' alt="" onClick={handleMobileMenuToggle}/>
                            </li>
                        )}
                    </ul>
                </nav>
            </section>
        </header>
    )
}

export default Header