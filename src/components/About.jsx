import { useEffect } from 'react';
import aboutHeroBg from '../assets/about-hero-bg.svg';
import { useLogic } from '../context/LogicContext';

const About = () => {
    const { t } = useLogic();
    // Header Gradient Removal
    useEffect(() => {
        const headerGradient = document.getElementById("HeaderGradient");
        headerGradient.style.display = "none";

        return () => {
        headerGradient.style.display = "block";
        }
    }, []);

    return (
        <main className="bg-black text-white font-light font-helvetica pb-10">
            <div 
                className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] flex items-center justify-center"
                style={{
                backgroundImage: `url(${aboutHeroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
            >
                <h1 className="text-5xl md:text-6xl font-light text-center text-white z-10 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    {t('aboutTitle')}
                </h1>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 p-8 md:p-12">
                <section className="space-y-6 text-lg text-gray-300">
                    <p className="leading-relaxed">
                        {t('aboutDearVisitor')}
                    </p>
                    
                    <p className="leading-relaxed">
                        {t('aboutWelcome')}
                    </p>

                    <p className="leading-relaxed">
                        {t('aboutDemonstration')}
                    </p>

                    <p className="leading-relaxed">
                        {t('aboutCustomWebsite')}
                    </p>
                </section>

                <div className="flex justify-center pt-8">
                    <a 
                        href="https://linktr.ee/YoussefAbotaleb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                    {t('connectWithMe')}
                </a>
                </div>
            </div>
        </main>
    );
};

export default About;