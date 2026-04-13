import { useState, useEffect } from 'react';
import { useLogic } from '../context/LogicContext';
import { Link } from 'react-router-dom';
import shoppingBagIcon from '../assets/shoppingBagIcon.svg';

const Cart = () => {
  const { displayConfirmationMessageHandler, displayErrorMessageHandler, navigateTo, products, t } = useLogic();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phone: '',
    state: '',
    apartment: '',
    postal: ''
  });

  useEffect(() => {
    if (!cartItems.length) return;
    // Hide the gradient
    const headerGradient = document.getElementById("HeaderGradient");
    headerGradient.style.display = "none";
    return () => { headerGradient.style.display = "block"; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    // Merge cart items with full product details from products state
    const enrichedCart = cartFromStorage.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      return {
        ...cartItem,
        image: product ? product.images[0] : null,
        brand: product ? product.brand : null
      };
    });
    setCartItems(enrichedCart);
    calculateSubtotal(enrichedCart);
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const item = cartItems[index];
    const product = products.find(p => p.id === item.id);
    if (product && newQuantity > product.max_quantity) {
      displayErrorMessageHandler(t('cart.validation.maxQuantity', { max: product.max_quantity }), 'Oops!');
      return;
    }
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  useEffect(() => {
    // Load saved shipping info if exists
    const savedInfo = localStorage.getItem('savedShippingInfo');
    if (savedInfo) {
      setShippingInfo(JSON.parse(savedInfo));
    }
  }, []);

  const validateForm = () => {
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'country', 'state'];
    const emptyFields = requiredFields.filter(field => !shippingInfo[field] || !shippingInfo[field].trim());
    
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(field => 
        field.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())
      ).join(', ');
      displayErrorMessageHandler(t('cart.validation.requiredFields', { fields: fieldNames }), 'Missing Information');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      displayErrorMessageHandler(t('cart.validation.invalidEmail'), 'Invalid Email');
      return false;
    }

    if (!selectedPaymentMethod) {
      displayErrorMessageHandler(t('cart.validation.missingPayment'), 'Missing Payment Method');
      return false;
    }
    
    return true;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (saveInfo) {
      localStorage.setItem('savedShippingInfo', JSON.stringify(shippingInfo));
    }
    // Here you would typically integrate with a payment processor
    displayConfirmationMessageHandler(t('cart.orderSuccess'), t('cart.orderSuccessTitle'));
    localStorage.removeItem('cart');
    setCartItems([]);
    navigateTo('/');
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value.trim() }));
  };

  if (cartItems.length === 0) {
    return (
      <main className="bg-black text-white font-light font-helvetica flex items-top justify-center pt-30">
        <div className="text-center space-y-6">
          <img src={shoppingBagIcon} alt="Empty Cart" className="w-16 h-16 mx-auto opacity-50" />
          <h2 className="text-2xl">{t('cart.emptyCart')}</h2>
          <Link to="/store" className="cursor-pointer inline-block px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grow-1 bg-black text-white font-light font-helvetica p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-full">
            <h1 className="text-3xl md:text-4xl mb-6">{t('cart.title')}</h1>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start gap-6 bg-[#111111] p-6 rounded-lg relative group hover:bg-[#1a1a1a] transition-colors duration-200">
                    <img
                        src={item.image ? `/products_assets/${item.image}` : '/products_assets/placeholder.svg'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className='flex-grow'>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-normal">{item.name}</h3>
                                <p className="text-gray-400 text-sm mt-1">{item.brand}</p>
                                <p className="text-gray-400 text-sm">{t('cart.size')}: {item.size}</p>
                            </div>
                            <button
                                onClick={() => removeItem(index)}
                                className="text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-full cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-black/30 rounded-lg">
                                    <button
                                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-l-lg transition-colors cursor-pointer"
                                        onClick={() => updateQuantity(index, item.quantity - 1)}
                                    >-</button>
                                    <span className="w-10 text-center">{item.quantity}</span>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-r-lg transition-colors cursor-pointer"
                                        onClick={() => {
                                          const product = products.find(p => p.id === item.id);
                                          if (product) {
                                            if (item.quantity >= product.max_quantity) {
                                              displayErrorMessageHandler(t('cart.validation.maxQuantity', { max: product.max_quantity }), 'Oops!');
                                              return;
                                            }
                                            updateQuantity(index, item.quantity + 1);
                                          }
                                        }}
                                    >+</button>
                                </div>
                            </div>
                            <p className="text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10 pb-10">
          <div className="space-y-6">
            <h2 className="text-2xl">{t('cart.contactInfo')}</h2>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleShippingInfoChange}
                placeholder={t('cart.placeholders.email')}
                required
                className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input
                type="tel"
                name="phone"
                placeholder={t('cart.placeholders.phone')}
                className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingInfoChange}
                  placeholder={t('cart.placeholders.firstName')}
                  required
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleShippingInfoChange}
                  placeholder={t('cart.placeholders.lastName')}
                  required
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            <h2 className="text-2xl pt-3">{t('cart.shippingAddress')}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingInfoChange}
                  placeholder={t('cart.placeholders.country')}
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingInfoChange}
                  placeholder={t('cart.placeholders.state')}
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                placeholder={t('cart.placeholders.address')}
                required
                className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input
                type="text"
                name="apartment"
                placeholder={t('cart.placeholders.apartment')}
                className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                  placeholder={t('cart.placeholders.city')}
                  required
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  name="postal"
                  placeholder={t('cart.placeholders.postal')}
                  className="w-full p-4 bg-[#111111] rounded focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="md:w-full sticky top-8">
            <div className="bg-[#111111] p-6 md:p-8 rounded-lg space-y-6">
              <h2 className="text-2xl mb-6">{t('cart.orderSummary')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.shippingFree')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.taxes')}</span>
                  <span>${(subtotal * 0.14).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-medium">
                    <span>{t('cart.total')}</span>
                    <span>${(subtotal + subtotal * 0.14).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('cart.paymentMethod')}</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="debit_credit"
                      checked={selectedPaymentMethod === 'debit_credit'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="form-radio text-white cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span>{t('cart.payViaCards')}</span>
                      <div className="flex gap-2 items-center flex-wrap">
                        <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                        <img src="/visa.svg" alt="Visa" className="h-4" />
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPaymentMethod === 'cod'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="form-radio text-white cursor-pointer"
                    />
                    <span>{t('cart.cashOnDelivery')}</span>
                  </label>
                </div>
              </div>

              {/* Save Information Checkbox */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="form-checkbox text-white rounded bg-transparent border-white cursor-pointer"
                />
                <span className="text-sm">{t('cart.saveInfo')}</span>
              </label>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-white text-black rounded hover:bg-gray-200 transition-colors mt-6 font-normal text-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {t('cart.orderButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;