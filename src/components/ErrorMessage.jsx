import { useLogic } from '../context/LogicContext';
import errorIcon from '../assets/errorIcon.svg';

const ErrorMessage = () => {
    const { displayErrorMessage } = useLogic();
    return (
        <>
            {
                displayErrorMessage.isVisible && (
                    <div className="fixed w-screen h-screen left-0 top-0 flex flex-row justify-center items-center bg-black/50 backdrop-blur-xs z-200 text-white">
                        <div id='ErrorBox' className="py-10 px-15 max-w-[80%] bg-red-800/80 shadow-2xl shadow-black rounded-xl flex flex-col justify-center items-center animate__animated animate__backInDown">
                            <img src={errorIcon} alt="Confirm Icon" className="w-10 h-10" />
                            <div className="text-2xl font-bold mb-4 mt-1">{displayErrorMessage.title}</div>
                            <div className="text-lg">{displayErrorMessage.message}</div>
                        </div>
                    </div>
            
                )
            }
        </>
    )
}

export default ErrorMessage