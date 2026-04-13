import { useLogic } from '../context/LogicContext';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useLogic();

  return (
    <main className="bg-black text-white font-light font-helvetica flex items-center justify-center min-h-[80vh] p-4">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-thin">404</h1>
          <h2 className="text-2xl md:text-3xl">{t('notFound.title')}</h2>
          <p className="text-gray-400 mt-4">{t('notFound.message')}</p>
        </div>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          {t('notFound.backToHome')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

