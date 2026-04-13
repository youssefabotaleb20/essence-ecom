/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogic } from '../context/LogicContext';
import img1 from "../assets/Hero/pexels-cottonbro-10621915.jpg";
import img2 from "../assets/Hero/pexels-cottonbro-5807468.jpg";
import img3 from "../assets/Hero/pexels-ekaterina-bolovtsova-4646948.jpg";
import img4 from "../assets/Hero/pexels-shvets-production-9775428.jpg";
import img5 from "../assets/Hero/pexels-pnw-prod-7576612.jpg";
import menSection from "../assets/menSection.jpg";
import womenSection from "../assets/womenSection.jpg";
import scrollRight from "../assets/scrollRight.svg";
import scrollDown from "../assets/scrollDown.svg";
import easyReturns from "../assets/easyReturns.svg"
import securePayment from "../assets/securePayment.svg"
import orderTracking from "../assets/orderTracking.svg"

const images = [img1, img2, img3, img4, img5];

const Home = () => {
  const { language, t, products, navigateToStoreCategory, navigateToProduct } = useLogic();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [balls, setBalls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("newArrival")

  // Header Gradient Removal
  useEffect(() => {
    const headerGradient = document.getElementById("HeaderGradient");
    headerGradient.style.display = "none";

    return () => {
      headerGradient.style.display = "block";
    }
  }, []);

  useEffect(() => {
    // Change images every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Initialize ball positions and movements
    const numBalls = 15;
    const initialBalls = Array.from({ length: numBalls }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));
    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => {
          let newX = ball.x + ball.dx * 2;
          let newY = ball.y + ball.dy * 2;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) ball.dx *= -1;
          if (newY <= 0 || newY >= window.innerHeight) ball.dy *= -1;

          return { ...ball, x: newX, y: newY };
        })
      );
    }, 20); // Smooth movement

    return () => clearInterval(interval);
  }, []);

  const scrollToLastElementShown = () => {
    const container = document.getElementById("ScrollStore");
    const items = container.children;
    const containerRight = container.scrollLeft + container.clientWidth;

    let lastVisibleItem = null;

    // Find the last fully visible item
    for (let i = 0; i < items.length; i++) {
        const itemLeft = items[i].offsetLeft;
        const itemRight = itemLeft + items[i].offsetWidth;

        if (itemRight <= containerRight) {
            lastVisibleItem = items[i];
        } else {
            break; // Stop at the first element that overflows
        }
    }

    if (lastVisibleItem) {
        container.scrollTo({
            left: lastVisibleItem.offsetLeft - container.offsetLeft,
            behavior: "smooth",
        });
    }
  }

/*   useEffect(() => {
    const scrollElement = document.getElementById("ScrollStore");
  
    const handleWheelScroll = (e) => {
      const { deltaX, deltaY } = e;
  
      // Determine if the scroll is primarily vertical
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        e.preventDefault();
        window.scrollBy({ top: deltaY, behavior: 'smooth' });
      }
      // If horizontal scroll, let the default behavior occur
    };
  
    scrollElement.addEventListener("wheel", handleWheelScroll, { passive: false });
  
    return () => {
      scrollElement.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);
 */

  useEffect(() => {
    const scrollElement = document.getElementById("ScrollStore");
  
    const handleWheelScroll = (e) => {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        e.preventDefault();
        scrollElement.classList.add("pointer-events-none")
      } else {
        scrollElement.classList.remove("pointer-events-none")
      }
    }
    scrollElement.addEventListener("wheel", handleWheelScroll);
  
    return () => {
      scrollElement.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <main className="flex flex-col flex-grow bg-transparent">
      <div className="fixed top-0 left-0 w-screen h-screen z-[-2] overflow-hidden">
        {/* Animated balls */}
        <div className="absolute inset-0 bg-transparent pointer-events-none z-30">
          {balls.map((ball, index) => (
            <div
              key={index}
              className="absolute w-5 h-5 md:w-8 md:h-8 bg-white rounded-full shadow-[0_0_10px_5px_rgba(255,255,255,0.6)]"
              style={{
                left: `${ball.x}px`,
                top: `${ball.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          ))}
        </div>
        {/* Image Background */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex flex-col h-[85vh] w-screen z-10">
        <div className="flex flex-col justify-center items-center h-full w-screen z-20 relative overflow-hidden bg-black/70 backdrop-blur-xs inset-shadow-[0_0_10px_10px_rgba(0,0,0,1)] pb-[8vh]">
          <div className="grid grid-cols-1">
            <p className="text-white text-right font-charmonman text-subtitle px-2 select-none cursor-default">{t('welcome')}</p>
            <h1 className="text-white font-helvetica text-center text-title/tight tracking-wider select-none cursor-default">ESSENCE</h1>
            <p className="text-white font-charmonman text-center pt-3 text-subtitle select-none cursor-default">{t('allBrands')}</p>
          </div>
          <img src={scrollDown} alt="" className="w-5 lg:w-7 animate__animated animate__heartBeat animate__infinite absolute left-[50%] bottom-20 select-none cursor-default"/>
        </div>
      </section>

      {/* Scroll Product Section */}
      <section className="bg-black z-10 pt-6 px-5 md:pt-10 md:px-10 xl:pt-10 xl:px-14 pb-4 font-helvetica md:font-light">
        <div className="flex flex-row justify-between items-center w-full text-white">
          <div className="flex flex-row gap-ArrivalPopular">
            <h2 className={`select-none text-h2 cursor-pointer border-b-2 pb-2 lg:pb-4 transition-all duration-500 ease-in-out ${selectedCategory === "newArrival" ? "border-white text-white" : "border-transparent opacity-40 hover:scale-110 hover:opacity-75"}`} onClick={() => {setSelectedCategory("newArrival")}}>{t('newArrival')}</h2>
            <h2 className={`select-none text-h2 cursor-pointer border-b-2 pb-2 lg:pb-4 transition-all duration-500 ease-in-out ${selectedCategory === "mostPopular" ? "border-white text-white" : "border-transparent opacity-40 hover:scale-110 hover:opacity-75"}`} onClick={() => {setSelectedCategory("mostPopular")}}>{t('mostPopular')}</h2>
          </div>
          {/* <button className="font-helvetica text-subtitle border-1 border-white px-6 py-0.5 rounded-lg cursor-pointer hover:scale-105 transition-all duration-500 active:scale-110 active:duration-100" onClick={() => {navigate(`/product/${selectedCategory}`)}}>View All</button> */}
          <img src={scrollRight} alt="" className="w-7 lg:w-10 cursor-pointer hover:scale-105 transition-all duration-150" onClick={() => {scrollToLastElementShown()}}/>
        </div>

        <div id="ScrollStore" className="flex flex-row gap-5 md:gap-8 lg:gap-10 items-start max-w-screen overflow-x-auto overflow-y-hidden my-5 px-1 scroll-smooth snap-x snap-mandatory" >
          {products
            .filter(product => product.group === selectedCategory)
            .map((product, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center min-w-35 md:min-w-50 hover:scale-102 transition-all duration-150 cursor-pointer relative snap-start"
                onClick={() => navigateToProduct(product.id)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}products_assets/${product.images[0]}`}
                  alt=""
                  className="w-full h-full object-cover object-top min-h-60 md:min-h-80 outline-none border-none rounded-sm my-3 select-none"
                  onMouseOver={(e) => {e.target.src = `${import.meta.env.BASE_URL}products_assets/${product.images[1]}`}} onMouseOut={(e) => {e.target.src = `${import.meta.env.BASE_URL}products_assets/${product.images[0]}`}}
                />
                <h3 className="text-white font-helvetica text-center text-subtitle font-bold">
                  {product.name}
                </h3>
                <p className="text-white font-helvetica text-center text-subtitle font-light opacity-70">
                  $ {product.price}
                </p>
                <p className="text-white font-helvetica text-center text-subtitle font-light opacity-70 absolute top-2 bg-black/80 backdrop-blur-xs w-full p-1">
                  {product.brand}
                </p>
              </div>
            ))}  
        </div>
      </section>

        {/* Men or Women Section */}
        <section className="grid grid-cols-2 w-screen pt-5 pb-0 bg-black select-none">
          <div className="w-[50vw] h-[60vh] lg:h-[90vh] overflow-hidden cursor-pointer relative" onClick={() => {navigateToStoreCategory("women")}}>
            <img src={womenSection} alt="" className="h-full w-full content-center object-cover hover:scale-110 transition-all duration-300 select-none" onMouseOver={() => {document.getElementById("hoverHere1").style.backgroundColor = "rgba(0,0,0,0)"}} onMouseLeave={() => {document.getElementById("hoverHere1").style.backgroundColor = "rgba(0,0,0,0.4)"}}/>
            <div id="hoverHere1" className="absolute w-full h-full bg-black/40 top-0 left-0 pointer-events-none flex flex-row justify-end items-end transition-all duration-300">
              <p className="text-titleTwo text-white font-extralight p-5 tracking-wider">{t('women')}</p>
            </div>
          </div>
          <div className="w-[50vw] h-[60vh] lg:h-[90vh] overflow-hidden cursor-pointer relative" onClick={() => {navigateToStoreCategory("men")}}>
            <img src={menSection} alt="" className="h-full w-full content-center object-cover hover:scale-110 transition-all duration-300 select-none" onMouseOver={() => {document.getElementById("hoverHere2").style.backgroundColor = "rgba(0,0,0,0)"}} onMouseLeave={() => {document.getElementById("hoverHere2").style.backgroundColor = "rgba(0,0,0,0.4)"}}/>
            <div id="hoverHere2" className="absolute w-full h-full bg-black/40 top-0 left-0 pointer-events-none flex flex-row justify-end items-end transition-all duration-300">
              <p className="text-titleTwo text-white font-extralight p-5 tracking-wider">{t('men')}</p>
            </div>
          </div>
        </section>
        
        {/* Perks Section */}
        <section className="bg-black/70 backdrop-blur-xs py-6 px-5 md:py-10 md:px-10 xl:py-15 xl:px-14 font-helvetica md:font-light grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 text-white text-center justify-start items-center bg-black/60 p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl shadow-white/15">
            <img src={securePayment} alt="" className="w-7 sm:w-8 md:w-10"/>
            <h2 className="text-p font-bold">{t('securePayments')}</h2>
            <p className="text-p">{t('securePaymentsDesc')}</p>
          </div>
          <div className="flex flex-col gap-4 text-white text-center justify-start items-center bg-black/60 p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl shadow-white/15">
            <img src={easyReturns} alt="" className="w-7 sm:w-8 md:w-10"/>
            <h2 className="text-p font-bold">{t('easyReturns')}</h2>
            <p className="text-p">{t('easyReturnsDesc')}</p>
          </div>
          <div className="flex flex-col gap-4 text-white text-center justify-start items-center bg-black/60 p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl shadow-white/15">
            <img src={orderTracking} alt="" className="w-7 sm:w-8 md:w-10"/>
            <h2 className="text-p font-bold">{t('orderTracking')}</h2>
            <p className="text-p">{t('orderTrackingDesc')}</p>
          </div>
        </section>
    </main>
  );
};

export default Home;