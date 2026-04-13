import { useParams } from 'react-router-dom';
import { useLogic } from '../context/LogicContext';
import { useEffect, useState } from 'react';
import shoppingBagIconBlack from '../assets/shoppingBagIconBlack.svg';
import ImageModal from './ImageModal';

const Product = () => {
  const { id } = useParams();
  const { products, navigateTo, displayConfirmationMessageHandler, displayErrorMessageHandler, t } = useLogic();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleAddToBag = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      displayErrorMessageHandler(t('product.selectSize'), 'Oops!');
      return;
    }
    if (quantity > product.max_quantity) {
      displayErrorMessageHandler(t('product.maxQuantity', { max: product.max_quantity }), 'Oops!');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if same product and size already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);
    if (existingItemIndex !== -1) {
      const totalQuantity = cart[existingItemIndex].quantity + quantity;
      if (totalQuantity > product.max_quantity) {
        displayErrorMessageHandler(t('product.alreadyInCart', { max: product.max_quantity }), 'Oops!');
        return;
      }
      cart[existingItemIndex].quantity = totalQuantity;
    } else {
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize
      };
      cart.push(newProduct);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayConfirmationMessageHandler(t(quantity > 1 ? 'product.addedToCartPlural' : 'product.addedToCart', { count: 'Item' }), 'Great!');
  };

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === Number(id));
      if (!foundProduct) {
        navigateTo('/notfound');
      }
      setProduct(foundProduct);
    }
  }, [id, products, navigateTo]);

  useEffect(() => {
    if (product) {
      const similar = products.filter(p => 
        p.id !== product.id && 
        p.for === product.for && 
        p.category === product.category
      ).slice(0, 4);
      setSimilarProducts(similar);
    }
  }, [product, products]);

  if (!product) {
    return null;
  }

  return (
    <main className="flex flex-col bg-black text-white p-4 md:p-8 font-light font-helvetica">
        <div className="flex flex-col items-center md:flex-row gap-8 mx-auto w-full">
            {/* Images */}
            <div className="relative md:w-1/2">
                <div className="overflow-x-auto md:overflow-y-auto md:overflow-x-hidden max-h-[90vh] space-y-0 md:space-y-4 space-x-4 md:space-x-0 flex md:flex-col scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent snap-mandatory snap-x md:snap-y" onWheel={(e) => e.stopPropagation()}>
                    {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={`${import.meta.env.BASE_URL}products_assets/${image}`}
                        alt={`${product.name} - View ${index + 1}`}
                        className="snap-center w-[80vw] md:w-full h-auto object-cover object-center rounded-lg transition-opacity duration-300 hover:opacity-90 flex-shrink-0 cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                    />
                    ))}
                </div>
            </div>
            
            {/* Product Details */}
            <div className="h-full flex flex-col justify-center gap-5 p-2 md:p-4 lg:p-6 w-full md:w-1/2">
                <div className='flex flex-col gap-1'>
                    <h1 className="text-4xl uppercase">{product.name}</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">${product.price}</span>
                        {product.oldPrice && (
                        <span className="text-lg line-through text-gray-400">${product.oldPrice}</span>
                        )}
                    </div>
                </div>
                <div className='bg-white/60 w-full h-[0.6px]'></div>
                <div className="flex flex-col gap-1 text-gray-300">
                  <span className='capitalize'><strong>{t('product.brand')}:</strong> {product.brand}</span>
                  <span className='capitalize'><strong>{t('product.for')}:</strong> {product.for}</span>
                  <span className='capitalize'><strong>{t('product.category')}:</strong> {product.category}</span>
                </div>
                <p className="text-gray-300">{product.description}</p>
                {product.size_chart && (
                  <>
                    <button
                      type="button"
                      className={`mb-3 px-10 py-2 rounded-lg border border-white bg-black/80 font-medium transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/60 w-fit cursor-pointer ${showSizeChart ? 'bg-white text-black' : 'text-white'}`}
                      onClick={() => setShowSizeChart(v => !v)}
                      aria-expanded={showSizeChart}
                      aria-controls="size-chart-table"
                    >
                      {showSizeChart ? t('product.hideSizeChart') : t('product.showSizeChart')}
                    </button>
                    <div
                      id="size-chart-table"
                      style={{display: showSizeChart ? 'block' : 'none', transition: 'all 0.3s'}}
                      className="bg-white text-black p-4 rounded shadow-md"
                    >
                      <h2 className="text-lg font-bold mb-2">{t('product.sizeChartCm')}</h2>
                      <table className="w-full text-left">
                        <thead>
                          <tr>
                            <th className="border-b-2" style={{width: '100px'}}>{t('product.size')}</th>
                            {(() => {
                              const firstSize = Object.values(product.size_chart)[0];
                              return Object.keys(firstSize).map((key) => (
                                <th key={key} className="border-b-2 capitalize" style={{width: '100px'}}>{key.replace(/_/g, ' ')}</th>
                              ));
                            })()}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(product.size_chart).map(([size, details]) => (
                            <tr key={size}>
                              <td className="border-b" style={{width: '100px'}}>{size}</td>
                              {Object.keys(details).map((key) => (
                                <td key={key} className="border-b" style={{width: '100px'}}>{details[key] || '-'}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                <form
                  className="space-y-4"
                  onSubmit={handleAddToBag}
                >
                  <div className="flex gap-4">
                    {product.sizes && Object.entries(product.sizes).map(([size, available]) => (
                      <button
                        key={size}
                        type="button"
                        className={` cursor-pointer px-4 py-2 border border-white rounded transition-colors ${selectedSize === size ? 'bg-white text-black' : ''} ${!available ? 'opacity-50 cursor-not-allowed line-through' : 'hover:bg-white hover:text-black'}`}
                        onClick={() => available && setSelectedSize(size)}
                        aria-pressed={selectedSize === size}
                        disabled={!available}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                    <div className="flex items-center justify-between border border-white rounded-lg">
                      <button
                        type="button"
                        className="px-4 py-2 text-xl hover:bg-white hover:text-black transition-colors rounded-l-lg cursor-pointer w-1/3"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        aria-label={t('product.quantity')}
                      >-</button>
                      <span className="px-4 py-2 text-xl w-1/3 text-center">{quantity}</span>
                      <button
                        type="button"
                        className="px-4 py-2 text-xl hover:bg-white hover:text-black transition-colors rounded-r-lg cursor-pointer w-1/3"
                        onClick={() => {
                          if (quantity >= product.max_quantity) {
                            displayErrorMessageHandler(t('product.maxQuantity', { max: product.max_quantity }), 'Oops!');
                            return;
                          }
                          setQuantity(q => q + 1);
                        }}
                        aria-label={t('product.quantity')}
                      >+</button>
                    </div>
                    <button
                      type="submit"
                      className={`cursor-pointer flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${product.sold_out ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 transition-colors'}`}
                      disabled={product.sold_out}
                    >
                      <img src={shoppingBagIconBlack} alt={t('product.addToBag')} className="w-5 h-5 inline-block align-middle" />
                      <span>{product.sold_out ? t('product.soldOut') : t('product.addToBag')}</span>
                    </button>
                  </div>
                </form>
            </div>
        </div>

        {selectedImageIndex !== null && (
          <ImageModal
            images={product.images}
            currentIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
          />
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl mb-8">{t('product.youMayAlsoLike')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map(item => (
                <div 
                  key={item.id} 
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => navigateTo(`/product/${item.id}`)}
                >
                  <div className="relative w-full" style={{ paddingBottom: '140%' }}>
                    <img
                      src={`${import.meta.env.BASE_URL}products_assets/${item.images[0]}`}
                      alt={item.name}
                      className="absolute top-0 left-0 w-full h-full object-cover object-top rounded-lg"
                    />
                  </div>
                  <h3 className="mt-3 text-lg">{item.name}</h3>
                  <p className="text-gray-400">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
    </main>
  );
};

export default Product;