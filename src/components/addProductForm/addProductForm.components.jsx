import './addProductForm.styles.scss';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';


const AddProductForm = ({setIsAddingProduct}) => {
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        brand: '',
        name: '',
        specification: '',
        description: '',
        price: '',
        isFixedAsset: false,
        isActive: true,
        imageUrl: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;
    
        // Check if the input name is 'price' and convert it to a number using the unary plus (+value)
        if (name === 'price') {
            finalValue = +value;
        }
    
        // Check if the input name is 'isFixedAsset' and convert 'true' or 'false' string to a boolean
        else if (name === 'isFixedAsset') {
            finalValue = value === 'true';
        }
    
        // Update the formData state with the new value
        setFormData(prevData => ({ ...prevData, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='add-product-page-overlay'>
            <div className='add-product-form-content'>
                <CloseIcon className="close-button" onClick={() => setIsAddingProduct(false)} />
                <h2>新增产品</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="product-brand">品牌*</label>
                        <input 
                            type="text" 
                            id='product-brand'
                            name="brand"
                            value={formData.brand}
                            placeholder='注：填写‘无牌’，如品牌不明'
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-name">产品名称*</label>
                        <input 
                            type="text" 
                            id='product-name'
                            name="name"
                            value={formData.name}
                            placeholder='输入产品名称'
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-specification">规格*</label>
                        <input 
                            type="text" 
                            id='product-specification'
                            name="specification"
                            value={formData.specification}
                            placeholder='输入产品规格'
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-price">单价*</label>
                        <input 
                            type="Number" 
                            id='product-price'
                            name="price"
                            value={formData.price}
                            placeholder='注：如价格不详，填0'
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-description">产品描述</label>
                        <input 
                            type="text" 
                            id='product-description'
                            name="description"
                            value={formData.description}
                            placeholder='注：可填写相关用途，非必填'
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-isFixedAsset">是否为固定资产</label>
                        <select 
                            name="isFixedAsset"
                            id='product-isFixedAsset'
                            onChange={handleChange} 
                            required
                        >
                            <option value="false">否</option>
                            <option value="true">是</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="product-image">产品图片</label>
                        <input type="file" name='image' id='product-image' accept="image/*" onChange={handleFileChange} />
                        {imagePreviewUrl && <div className="image-preview-container">
                                                <img src={imagePreviewUrl} alt="Image Preview" className='image-preview' />
                                            </div>
                        }
                    </div>
                    <button type="submit">完成</button>
                </form>
            </div>
        </div>
    );
};


export default AddProductForm;
