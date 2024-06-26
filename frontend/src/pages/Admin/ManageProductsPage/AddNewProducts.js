import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import Input from '../../../components/Form/Input';
import Select from '../../Admin/components/Form/Select';
import QuantityInput from '../../../components/Form/Select';

function AddNewProduct(props) {
    const { onClose } = props;
    const [productTypes, setProductTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [formAddNewProduct, setFormAddNewProduct] = useState({
        encryptedData: '',
        expiry: '',
        productType: '',
        status: 'available',
    });
    const ClearInputs = () => {
        setFormAddNewProduct({
            encryptedData: '',
            expiry: '',
            productType: '',
            status: 'available',
        });
    };
    const handleOnformAddNewProductChange = (data) => {
        setFormAddNewProduct({ ...formAddNewProduct, [Object.keys(data)[0]]: Object.values(data)[0] });
    };

    const handleAddProduct = () => {
        const InsertNewProductType = async () => {
            const options = {
                url: 'http://localhost:5000/api/product/create',
                method: 'POST',
                data: formAddNewProduct,
            };

            await axios
                .request(options)
                .then((response) => {
                    const result = response.data;

                    if (result.success) {
                        alert('Tạo Product thành công');
                        ClearInputs()
                        window.location.reload();
                    }

                })
                .catch((err) => {});
        };

        InsertNewProductType();
    };


    useEffect(() => {
        async function getProductTypes() {
            const options = {
                url: `http://localhost:5000/api/productType/readMany`,
                method: 'GET',
            };

            await axios
                .request(options)
                .then((response) => {
                    const result = response.data;
                    setProductTypes(result.types);
                })
                .catch((err) => {
                });
        }

        getProductTypes();
    }, []);


    return (
        <div className="my-4 bg-white rounded-xl mx-5 w-[50%] p-5 relative">
            <div className="right-0 top-0 absolute m-5 cursor-pointer" onClick={onClose}>
                <IoMdClose className="text-[30px]" />
            </div>
            <form className="mt-[20px] flex flex-col gap-10 items-center">
                <p className="font-bold text-[20px]">Add New Product</p>
                <div className="flex flex-col gap-8 w-[80%]">
                    <Input
                        type={'text'}
                        id={'encryptedData'}
                        value={formAddNewProduct.encryptedData}
                        label={'Encrypted Data'}
                        placeHolder={'Please enter Encrypted Data'}
                        onChange={handleOnformAddNewProductChange}
                        customClass={'md:w-[49%]'}
                    />
                    <div>
                        <label className="block mb-2 text-xl font-medium">Product Type</label>
                        <div className="relative bg-gray-200 rounded">
                            <Select
                                defaultValue={''}
                                options={productTypes
                                    ? productTypes.map((item) => {
                                            return {
                                                value: item._id,
                                                name: item.typeName,
                                            };
                                        })
                                    : []}
                                onChange={(e) => {
                                    let updatedForm = { ...formAddNewProduct };
                                    updatedForm['productType'] = e.target.value;
                                    setFormAddNewProduct({ ...updatedForm });
                                }}
                                value={formAddNewProduct['productType']}
                            />
                        </div>
                    </div>
                    <Input
                        type={'text'}
                        id={'expiry'}
                        value={formAddNewProduct.expiry}
                        label={'Expire Date'}
                        placeHolder={'Please enter Expire Date'}
                        onChange={handleOnformAddNewProductChange}
                        customClass={'md:w-[49%]'}
                    />
                    <div onClick={handleAddProduct} className="bg-green-500 py-3 px-8 cursor-pointer text-center rounded-xl text-white 2sm:px-12">Add</div>
                </div>
            </form>
        </div>
    );
}

export default AddNewProduct;
