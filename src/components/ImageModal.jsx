/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const ImageModal = ({ images, currentIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setActiveIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={`${import.meta.env.BASE_URL}products_assets/${images[activeIndex]}`}
          alt="Product view"
          className="max-h-[98vh] max-w-[98vw] object-contain"
        />

        {/* Navigation buttons and counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 bg-black/50 text-white px-4 py-2 rounded-full">
          <button
            onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))}
            className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span>{activeIndex + 1} / {images.length}</span>

          <button
            onClick={() => setActiveIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))}
            className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;