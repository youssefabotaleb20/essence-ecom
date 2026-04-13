import helloIcon from '../assets/helloIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useLogic } from '../context/LogicContext';

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const { t } = useLogic();
  return (
    <div className="fixed w-screen h-screen left-0 top-0 flex flex-row justify-center items-center bg-black/50 backdrop-blur-xs z-200 text-white">
        <div id='WelcomeBox' className="py-10 px-15 max-w-2xl bg-black/90 shadow-2xl shadow-black rounded-xl flex flex-col justify-center items-center animate__animated animate__backInDown gap-2">
            <img src={helloIcon} alt="Confirm Icon" className="w-10 h-10" />
            <div className="text-2xl font-bold mb-4 mt-1">{t('welcomeTitle')}</div>
            <div className="text-lg text-center">{t('welcomeMessage')}</div>
            <div className="text-lg underline cursor-pointer hover:text-white/70 transition-all duration-200" onClick={() => {navigate("/about")}}>{t('learnMore')}</div>
        </div>
    </div> 
  )
}

export default WelcomeMessage