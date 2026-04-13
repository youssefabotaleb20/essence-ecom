import { Link } from 'react-router-dom';
import { useLogic } from '../context/LogicContext';
import logo from '../assets/LOGO.svg';
import cancel from '../assets/cancelIcon.svg'

const MobileMenu = () => {
    const { 
        language, 
        changeLanguage, 
        navigateToHome, 
        handleMobileMenuLinkClick, 
        mobileMenuState 
    } = useLogic();

    return (
        mobileMenuState.isActive && (
            <section id='MobileMenuContainer' className='bg-black/75 backdrop-blur-sm left-0 top-0 fixed z-100 h-screen w-screen py-6 animate__animated animate__faster'>
                <div id='MobileMenuContent1' className='flex flex-row justify-between items-center px-6 animate__animated animate__faster'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <div className='flex flex-row items-center gap-3'>
                            <img src={logo} alt="" className='w-35 md:w-40 lg:w-50' onClick={() => {navigateToHome(); handleMobileMenuLinkClick()}} />
                            <select 
                                defaultValue={language} 
                                onChange={(e) => changeLanguage(e.target.value)} 
                                className="select select-ghost focus:outline-none focus:bg-transparent hover:border-b-white transition-all duration-300 ease-in-out cursor-pointer px-3 text-white focus:text-white/70"
                            >
                                <option value="en">EN</option>
                                <option value="es">ES</option>
                            </select>
                        </div>
                        <div>
                            <img src={cancel} alt="" className='w-5 lg:w-6 cursor-pointer hover:scale-115 transition-all duration-500' onClick={() => {handleMobileMenuLinkClick()}} />
                        </div>
                    </div>
                </div>
                <nav id='MobileMenuContent2' className='mt-20 flex flex-col gap-10 text-white animate__animated animate__faster'>
                    <Link onClick={handleMobileMenuLinkClick} className='px-6' to="/store">Store</Link>
                    <div className='h-[1.2px] bg-white w-full'></div>
                    <Link onClick={handleMobileMenuLinkClick} className='px-6' to="/about">About</Link>
                    <div className='h-[1.2px] bg-white w-full'></div>
                    <Link onClick={handleMobileMenuLinkClick} className='px-6' to="/contact">Contact</Link>
                </nav>
            </section>
        )
    );
};

export default MobileMenu;