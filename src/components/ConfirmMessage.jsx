import { useLogic } from '../context/LogicContext';
import confirmIcon from '../assets/confirmIcon.svg';

const ConfirmMessage = () => {
    const { displayConfirmationMessage } = useLogic();
    return (
        <>
            {
                displayConfirmationMessage.isVisible && (
                    <div className="fixed w-screen h-screen left-0 top-0 flex flex-row justify-center items-center bg-black/50 backdrop-blur-xs z-200 text-white">
                        <div id='ConfirmBox' className="py-10 px-15 max-w-[80%] bg-green-800/80 shadow-2xl shadow-black rounded-xl flex flex-col justify-center items-center animate__animated animate__backInDown">
                            <img src={confirmIcon} alt="Confirm Icon" className="w-10 h-10" />
                            <div className="text-2xl font-bold mb-4 mt-1">{displayConfirmationMessage.title}</div>
                            <div className="text-lg">{displayConfirmationMessage.message}</div>
                        </div>
                    </div>
            
                )
            }
        </>
    )
}

export default ConfirmMessage