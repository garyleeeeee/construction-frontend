import './productsManagementPage.styles.scss';
import { useEffect, useState } from 'react';
import { httpGetAllProducts } from '../../hooks/requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductsManagementPage = () => {
    const [ allProducts, setAllProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        let isMounted = true;

        async function getAllProducts () {
            setIsLoading(false)
            const response = await httpGetAllProducts();

            if (!isMounted) return;

            //Token Expired
            if (response.message === 'Invalid Token') {
                // Handle token expiration
                setIsLoading(false);

            } else 
            if (!response.success) {
                setIsLoading(false);

            } else {
                setIsLoading(false);
                setAllProducts(response.data);
            };
            return () => {
                isMounted = false;  // Set to false when component unmounts
            };
        }

        getAllProducts();

    }, [])

    return (
        <div className='products-management-page-container'>
            <div className='header-area'> 
                <button className='add-product-button'>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className='products-display-container'>
                {allProducts.map((product, index) => {
                    return (
                        <div key={product._id}>
                            <span>{`品牌：${product.brand}`}</span><br/>
                            <span>{`产品：${product.name}`}</span><br/>
                            <span>{`规格：${product.specification}`}</span><br/>
                            <span>{`价格：${product.price}元`}</span><br/>
                            <span>{`产品描述：${product.description}`}</span>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
};




export default ProductsManagementPage;