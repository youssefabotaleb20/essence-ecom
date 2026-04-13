/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogic } from '../context/LogicContext';

const Store = () => {
  const { 
    language, 
    t, 
    products,
    displayedProducts,
    setDisplayedProducts,
    isFoundProducts,
    setIsFoundProducts,
    title,
    setTitle,
    sortOption,
    setSortOption,
    filterOption,
    setFilterOption,
    displayCount,
    handleShowMore,
    navigateToProduct
  } = useLogic();
    const params = useParams();

    const sortTextRef = useRef(null);
    const filterTextRef = useRef(null);
    const [sortWidth, setSortWidth] = useState(100);
    const [filterWidth, setFilterWidth] = useState(100);

    // Dynamically get unique categories from products
    const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
    const filterLabels = { all: t('filter'), ...Object.fromEntries(categories.map(cat => [cat, t(`category_${cat}`)])) };

    const sortLabels = {
        none: t('sort'),
        p: t('priceLowHigh'),
        P: t('priceHighLow'),
        a: t('nameAToZ'),
        z: t('nameZToA')
    };

    useEffect(() => {
        if (sortTextRef.current) {
            setSortWidth(sortTextRef.current.offsetWidth + 30);
        }
    }, [sortOption]);

    useEffect(() => {
        if (filterTextRef.current) {
            const selectedText = filterLabels[filterOption] || t(`category_${filterOption}`);
            filterTextRef.current.textContent = selectedText;
            setFilterWidth(filterTextRef.current.offsetWidth + 30);
        }
    }, [filterOption, filterLabels]);

    useEffect(() => {
        let filteredProducts = [];

        // Route filtering logic
        if (params.target === "women") {
            filteredProducts = products.filter(product => product.for === "women" || product.for === "unisex");
            setTitle(t('women'));
        } else if (params.target === "men") {
            filteredProducts = products.filter(product => product.for === "men" || product.for === "unisex");
            setTitle(t('men'));
        } else if (params.target && params.target.includes("search$")) {
            filteredProducts = products.filter(product => product.name.toLowerCase().includes(params.target.toLowerCase().replace("search$", "")));
            setTitle(params.target.replace("search$", ""));
        } else {
            filteredProducts = [...products];
            setTitle(t('allProducts'));
        }

        // Filtering logic by category
        if (filterOption !== "all") {
            filteredProducts = filteredProducts.filter(product => product.category === filterOption);
        }

        const sortedProducts = [...filteredProducts];
        // Sorting logic
        if (sortOption === "p") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "P") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "a") {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "z") {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        setDisplayedProducts(sortOption === "none" ? filteredProducts : sortedProducts);
        setIsFoundProducts(filteredProducts.length > 0);
    }, [products, params.target, sortOption, filterOption]);



    return (
        <main className="bg-black px-4 pb-3 md:px-10 md:pb-5 pt-5 md:pt-8 lg:pt-10">
            <div className="flex flex-row flex-nowrap justify-between items-end gap-4 mb-4">
                <h1 className="text-white text-3xl md:text-5xl font-thin truncate">{title}</h1>
                <div className="flex flex-row flex-nowrap gap-4">
                    {/* Filter */}
                    <div className="relative">
                        <span
                            ref={filterTextRef}
                            className="invisible absolute whitespace-nowrap text-white text-base"
                        >
                            {filterLabels[filterOption] || t(`category_${filterOption}`)}
                        </span>
                        <select
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                            style={{ width: `${filterWidth}px`, minWidth: '65px' }}
                            className="text-white appearance-none border-none bg-transparent cursor-pointer focus:outline-none text-base pr-6"
                        >
                            <option value="all">{t('filter')}</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{t(`category_${cat}`)}</option>
                            ))}
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.5 5.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5l-6 6-6-6z" />
                            </svg>
                        </span>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <span
                            ref={sortTextRef}
                            className="invisible absolute whitespace-nowrap text-white text-base"
                        >
                            {sortLabels[sortOption]}
                        </span>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            style={{ width: `${sortWidth}px`, minWidth: '65px' }}
                            className="text-white appearance-none border-none bg-transparent cursor-pointer focus:outline-none text-base pr-6"
                        >
                            <option value="none">{t('sort')}</option>
                            <option value="p">{t('priceLowHigh')}</option>
                            <option value="P">{t('priceHighLow')}</option>
                            <option value="a">{t('nameAToZ')}</option>
                            <option value="z">{t('nameZToA')}</option>
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.5 5.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5l-6 6-6-6z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            <div className='h-[1px] w-full bg-white mb-4'></div>

            {!isFoundProducts && (
                <h1 className="text-white text-center text-md md:text-lg h-full py-10 px-5">
                    {t('noProductsFound')}
                </h1>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                {displayedProducts.slice(0, displayCount).map(product => (
                    <div key={product.id} className="relative p-2 md:p-4 hover:scale-102 transition-all duration-300 cursor-pointer" onClick={() => navigateToProduct(product.id)}>
                        <div className="relative w-full" style={{ paddingBottom: '140%' }}>
                            <img
                                src={`/products_assets/${product.images[0]}`}
                                alt=""
                                className="absolute top-0 left-0 object-cover object-top outline-none border-none select-none w-full h-full bg-gray-500 mb-2 rounded-lg"
                                onMouseOver={(e) => {e.target.src = `/products_assets/${product.images[1]}`}} 
                                onMouseOut={(e) => {e.target.src = `/products_assets/${product.images[0]}`}}
                            />
                            <p className="text-white font-helvetica text-center text-subtitle font-light opacity-70 absolute top-0 left-0 bg-black/80 backdrop-blur-xs w-full p-1">
                                {product.brand}
                            </p>
                        </div>
                        <h2 className="text-white text-base md:text-lg text-center select-text cursor-text pt-3">{product.name}</h2>
                        <p className="text-gray-400 text-center text-sm md:text-base select-text cursor-text">${product.price}</p>
                    </div>
                ))}

                <div className="col-span-full p-6 pt-10">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <p className="text-white text-base md:text-lg select-text">
                            {t('showing')} {Math.min(displayCount, displayedProducts.length)} {t('outOf')} {displayedProducts.length} {t('products')}
                        </p>
                        {displayCount < displayedProducts.length && (
                            <button className="cursor-pointer mt-2 px-10 py-2 bg-black text-white rounded border-white border-1 hover:bg-white hover:text-black transition-all duration-300 ease-in-out" onClick={handleShowMore}>
                                {t('showMore')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Store;