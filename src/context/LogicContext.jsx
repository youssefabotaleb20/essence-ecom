/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LogicContext = createContext();

export const LogicProvider = ({ children }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [language, setLanguage] = useState(() => i18n.language);
    const [products, setProducts] = useState([]);
    
    // Store component states
    const [allowFilter, setAllowFilter] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [isFoundProducts, setIsFoundProducts] = useState(false);
    const [title, setTitle] = useState("All Products");
    const [sortOption, setSortOption] = useState("none");
    const [filterOption, setFilterOption] = useState("all");
    const [displayCount, setDisplayCount] = useState(12);

    // UI State Management
    const [mobileMenuState, setMobileMenuState] = useState({
        isActive: false,
        isVisible: false
    })
    const [searchBarState, setSearchBarState] = useState({
        isActive: false,
        isVisible: false
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(false);

    // Message States
    const [displayErrorMessage, setDisplayErrorMessage] = useState({
        isVisible: false,
        title: "",
        message: ""
    })
    const [displayConfirmationMessage, setDisplayConfirmationMessage] = useState({
        isVisible: false,
        title: "",
        message: ""
    })

    // Fetch products from JSON file
    useEffect(() => {
        fetch("/products.json")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error loading products:", error));
    }, []);

    // Responsive Layout Management
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Language Management
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        window.location.reload();
    };

    // Navigation Functions
    const navigateToHome = () => {
        window.scrollTo(0, 0);
        navigate('/');
    };
    const navigateToProduct = (productId) => {
        window.scrollTo(0, 0);
        navigate(`/product/${productId}`);
    };
    const navigateToStore = () => {
        window.scrollTo(0, 0);
        navigate('/store');
    };
    const navigateToStoreCategory = (category) => {
        window.scrollTo(0, 0);
        navigate(`/store/${category}`);
    };
    const handleShowMore = () => {
        setDisplayCount((prevCount) => Math.min(prevCount + 12, displayedProducts.length));
    };
    const navigateTo = (path) => {
        window.scrollTo(0, 0);
        navigate(path);
    }

    // Mobile Menu Animation Management
    useEffect(() => {
    if (mobileMenuState.isActive) {
        const container = document.getElementById('MobileMenuContainer')
        const content1 = document.getElementById('MobileMenuContent1')
        const content2 = document.getElementById('MobileMenuContent2')

        if (container && content1 && content2) {
            container.classList.add(mobileMenuState.isVisible ? 'animate__slideInDown' : 'animate__slideOutUp')
            content1.classList.add(mobileMenuState.isVisible ? 'animate__fadeInDown' : 'animate__fadeOutUp')
            content2.classList.add(mobileMenuState.isVisible ? 'animate__fadeInDown' : 'animate__fadeOutUp')
        }
    }
    }, [mobileMenuState])

    // Search Bar Animation Management
    useEffect(() => {
        if (searchBarState.isActive) {
            const searchBar = document.getElementById('SearchBar')
            if (searchBar) {
                searchBar.classList.add(searchBarState.isVisible ? 'animate__slideInDown' : 'animate__slideOutUp')
            }
        }
    }, [searchBarState])

    // UI Interaction Handlers
    const handleMobileMenuToggle = () => {
        if (!mobileMenuState.isActive) {
            setMobileMenuState({ isActive: true, isVisible: true })
        } else {
            setMobileMenuState(prev => ({ ...prev, isVisible: !prev.isVisible }))
            
            // Reset isActive state after animation completes when closing
            if (mobileMenuState.isVisible) {
                setTimeout(() => {
                    setMobileMenuState(prev => ({ ...prev, isActive: false }))
                }, 500) // Match animation duration
            }
        }
        
        // Close search bar if open
        if (searchBarState.isVisible) {
            setSearchBarState(prev => ({ ...prev, isVisible: false }))
            setTimeout(() => {
                setSearchBarState(prev => ({ ...prev, isActive: false }))
            }, 500) // Match animation duration
        }
    }

    const handleSearchBarToggle = () => {
        if (!searchBarState.isActive) {
            setSearchBarState({ isActive: true, isVisible: true })
        } else {
            setSearchBarState(prev => ({ ...prev, isVisible: !prev.isVisible }))
            
            // Reset isActive state after animation completes when closing
            if (searchBarState.isVisible) {
                setTimeout(() => {
                    setSearchBarState(prev => ({ ...prev, isActive: false }))
                }, 500) // Match animation duration
            }
        }

        // Close mobile menu if open
        if (mobileMenuState.isVisible) {
            setMobileMenuState(prev => ({ ...prev, isVisible: false }))
            const checkbox = document.getElementById('HamburgerMenuInput')
            if (checkbox) checkbox.checked = false
            
            setTimeout(() => {
                setMobileMenuState(prev => ({ ...prev, isActive: false }))
            }, 500) // Match animation duration
        }
    }

    const handleMobileMenuLinkClick = () => {
        setMobileMenuState(prev => ({ ...prev, isVisible: false }))
        const checkbox = document.getElementById('HamburgerMenuInput')
        if (checkbox) checkbox.checked = false
        
        // Reset isActive state after animation completes
        setTimeout(() => {
            setMobileMenuState(prev => ({ ...prev, isActive: false }))
        }, 500) // Match animation duration
    }

    // Error Message Management
    const displayErrorMessageHandler = (message, title) => {
        setDisplayErrorMessage({ isVisible: true, title: title, message: message })
        setTimeout(() => {
            document.getElementById('ErrorBox').classList.remove('animate__backInDown')
            document.getElementById('ErrorBox').classList.add('animate__backOutDown')
        }, 3000)
        setTimeout(() => {
            setDisplayErrorMessage({ isVisible: false,  message: "" })
        }, 3700)
    }

    // Confirmation Message Management
    const displayConfirmationMessageHandler = (message, title) => {
        setDisplayConfirmationMessage({ isVisible: true, title: title, message: message })
        setTimeout(() => {
            document.getElementById('ConfirmBox').classList.remove('animate__backInDown')
            document.getElementById('ConfirmBox').classList.add('animate__backOutDown')
        }, 3000)
        setTimeout(() => {
            setDisplayConfirmationMessage({ isVisible: false,  message: "" })
        }, 3700)
    }

    const value = {
        language,
        t,
        changeLanguage,
        products,
        // Store states and functions
        allowFilter,
        setAllowFilter,
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
        setDisplayCount,
        handleShowMore,
        // Footer states and functions
        isMobile,
        // Navigation functions
        navigateToHome,
        navigateToProduct,
        navigateToStore,
        navigateToStoreCategory,
        navigateTo,
        // UI states and functions
        handleMobileMenuLinkClick,
        handleSearchBarToggle,
        handleMobileMenuToggle,
        setSearchQuery,
        searchQuery,
        mobileMenuState,
        searchBarState,
        // Error and Confirmation Message states and functions
        displayErrorMessage,
        displayErrorMessageHandler,
        displayConfirmationMessage,
        displayConfirmationMessageHandler
    };

    return (
        <LogicContext.Provider value={value}>
        {children}
        </LogicContext.Provider>
    );
    };

    // eslint-disable-next-line react-refresh/only-export-components
    export const useLogic = () => {
    const context = useContext(LogicContext);
    if (!context) {
        throw new Error('useLogic must be used within a LogicProvider');
    }
    return context;
    };