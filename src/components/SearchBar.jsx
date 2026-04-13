import { useLogic } from '../context/LogicContext';
import searchIcon2 from '../assets/searchIcon2.svg';
import cancelIcon from '../assets/cancelIcon.svg';

const SearchBar = () => {
    const { t } = useLogic();
    const { 
        products, 
        navigateToProduct, 
        navigateToStoreCategory, 
        handleSearchBarToggle, 
        searchQuery, 
        setSearchQuery, 
        searchBarState 
    } = useLogic();

    return (
        searchBarState.isActive && (
            <section id="SearchBar" className='select-none flex flex-col justify-start items-center gap-3 bg-black/75 backdrop-blur-lg lg:backdrop-blur-xl left-0 top-0 fixed z-100 h-screen w-screen py-6 lg:py-8 animate__animated animate__faster'>
                <form className='w-[80vw] max-w-xl flex flex-row gap-6 mb-4' onSubmit={(e) => {e.preventDefault(); searchQuery.length > 1 && navigateToStoreCategory(`search$${searchQuery.replace(/\s+/g, ' ')}`); handleSearchBarToggle()}}>
                    <input 
                        autoFocus 
                        type="search" 
                        placeholder={t('searchPlaceholder')}
                        className={`bg-white text-black/80 pl-2 pr-8 py-1 rounded-sm w-full relative bg-image bg-no-repeat bg-[position:right_0.5rem_center] bg-[length:20px] outline-none focus:scale-103 transition-all duration-150 select-text`} 
                        style={{ backgroundImage: `url("${searchIcon2}")` }} 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img 
                        src={cancelIcon} 
                        alt="" 
                        onClick={handleSearchBarToggle} 
                        className='w-5 lg:w-6 cursor-pointer hover:scale-115 transition-all duration-500'
                    />
                </form>
                <div className='w-[80vw] max-w-xl flex flex-row justify-between items-end text-white border-b-1 border-b-white py-2'>
                    <h1 className='text-lg font-bold'>{t('searchProducts')}</h1>
                    <p 
                        className='text-sm cursor-pointer hover:scale-105 transition-all duration-300' 
                        onClick={() => {searchQuery.length > 1 && navigateToStoreCategory(`search$${searchQuery.replace(/\s+/g, ' ')}`); handleSearchBarToggle();}}
                    >
                        {t('searchSeeAll')}
                    </p>
                </div>
                <div className='w-[80vw] max-w-xl overflow-y-scroll flex flex-col gap-6 scroll-smooth'>
                    {searchQuery.length > 1 ? (
                        products
                            .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((product, index) => (
                                <div 
                                    key={index} 
                                    className="flex flex-row gap-6 justify-left items-center mt-3 cursor-pointer hover:bg-white/10 transition-all duration-300 rounded-lg p-2"
                                    onClick={() => {navigateToProduct(product.id); handleSearchBarToggle()}}
                                >
                                    <img
                                        src={`/products_assets/${product.images[0]}`}
                                        alt=""
                                        className="h-35 w-25 lg:h-40 lg:w-30 object-cover object-top outline-none border-none rounded-sm my-3 select-none"
                                        onMouseOver={(e) => {e.target.src = `/products_assets/${product.images[1]}`}}
                                        onMouseOut={(e) => {e.target.src = `/products_assets/${product.images[0]}`}}
                                    />
                                    <div className='flex flex-col justify-start items-start h-full w-full px-1 lg:px-4 py-4'>
                                        <p className="text-white font-helvetica font-light opacity-70 text-lg">{product.brand}</p>
                                        <h3 className="text-white font-helvetica font-bold text-lg">{product.name}</h3>
                                        <p className="text-white font-helvetica font-light text-lg">$ {product.price}</p>
                                        <div className='w-full flex flex-row justify-start items-end h-full'>
                                            <div className='flex flex-row gap-2 justify-start items-end'>
                                                {product.sizes && Object.entries(product.sizes).map(([size, available]) => (
                                                    <div
                                                        key={size}
                                                        className={`py-0.5 px-2 md:py-1 md:px-3 bg-white/75 text-black font-light text-sm rounded-sm ${!available && 'line-through text-black/30'}`}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p className='w-full h-full text-center text-white py-5'>{t('searchItemsWillAppear')}</p>
                    )}
                </div>
            </section>
        )
    );
};

export default SearchBar;