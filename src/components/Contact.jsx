import { useState, useEffect } from 'react';
import { useLogic } from '../context/LogicContext';
import contactPageBG from '../assets/contactPageBG.svg';
import paperPlane from '../assets/paperPlane.svg';

const Contact = () => {
  const { displayConfirmationMessageHandler, t } = useLogic();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    message: ''
  });

  useEffect(() => {
    const headerGradient = document.getElementById("HeaderGradient");
    headerGradient.style.display = "none";
    return () => { headerGradient.style.display = "block"; }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    displayConfirmationMessageHandler(t('messageSentText'), t('messageSentTitle'));
    setFormData({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-black text-white font-light font-helvetica flex items-center justify-center relative">
      <div
        className="absolute inset-0 z-0"
      >
        <img
          src={contactPageBG}
          alt="Contact Background"
          className="w-full h-full object-cover"
          loading='eager'
        />
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <div className="bg-black/70 max-w-xl py-10 md:py-15 px-7 md:px-20 rounded-3xl shadow-2xl shadow-black/20 backdrop-blur-md my-10 mx-5">
          <h1 className="text-3xl text-left mb-6">{t('contactUs')}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('emailPlaceholder')}
                required
                className="w-full p-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('phonePlaceholder')}
                required
                className="w-full p-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('firstNamePlaceholder')}
                  required
                  className="w-full p-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('lastNamePlaceholder')}
                  required
                  className="w-full p-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
                rows="6"
                className="w-full p-2 bg-white text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-4">{t('returnInstructions')}</p>
            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <img src={paperPlane} alt="Paper Plane Icon" className="w-6 h-6" />
              {t('sendButton')}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
