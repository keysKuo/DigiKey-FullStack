import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import { categories } from '../../../constants/dummyData';
import Input from '../components/Form/Input';
import Select from '../components/Form/Select';
import axios from 'axios';
import UploadBox from '../components/Form/UploadBox';

function AddNewProductType(props) {
    const { data = {
        typeName: '',
        category: '',
        originalPrice: 0,
        sellPrice: 0,
        description: '',
        isHot: false,
    }, onClose } = props;
    const [categories, setCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const [formAddNewProductType, setFormAddNewProductType] = useState(data);
    const ClearInputs = () => {
        setFormAddNewProductType({
            typeName: '',
            category: '',
            originalPrice: 0,
            sellPrice: 0,
            description: '',
            isHot: false,
        });
    };

    const handleAddProductType = () => {
        const InsertNewProductType = async () => {
            const options = {
                url: 'http://localhost:5000/api/productType/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formAddNewProductType,
            };

            await axios
                .request(options)
                .then((response) => {
                    const result = response.data;

                    if (result.success) {
                        alert('Tạo Product Type thành công');
                        ClearInputs();
                    }

                })
                .catch((err) => [console.log(err)]);
        };

        InsertNewProductType();
    };

    const handleUpdateProductType = () => {
        const updateProductType = async () => {
            const options = {
                url: `http://localhost:5000/api/productType/update/${data.typeId}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formAddNewProductType,
            };

            await axios
                .request(options)
                .then((response) => {
                    const result = response.data;

                    if (result.success) {
                        alert(`Sửa Product Type ${data.typeId} thành công`);
                        // ClearInputs();
                    }

                    console.log(result);
                })
                .catch((err) => [console.log(err)]);
        };

        updateProductType();
    }

    useEffect(() => {
        async function getCatgories() {
            const options = {
                url: 'http://localhost:5000/api/category/readMany',
                method: 'GET',
            };

            await axios
                .request(options)
                .then((response) => {
                    const result = response.data;
                    setCategories(result.categories);
                    setSelectedValue(categories[0]?._id);
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getCatgories();
    }, []);

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
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getProductTypes();
    }, []);

    return (
        <>
            <div className="my-4 bg-white rounded-xl mx-5 w-[60%] p-5 relative">
                <div className="right-0 top-0 absolute m-5 cursor-pointer" onClick={onClose}>
                    <IoMdClose className="text-[30px]" />
                </div>
                <div className="w-full flex flex-col items-center mt-5 gap-10">
                    <p className="font-bold text-[20px]">Add New Product Type</p>
                    <form className="w-full addProductTypeForm flex items-center justify-center flex-col">
                        <div className="w-[80%] grid grid-cols-2 space-x-3 mb-3">
                            <div className="col-span-1">
                                <label className="block mb-2 text-xl font-medium">Type Name</label>
                                <div className="relative bg-gray-200 rounded">
                                    <Input
                                        onChange={(e) => {
                                            let updatedForm = { ...formAddNewProductType };
                                            updatedForm['typeName'] = e.target.value;
                                            setFormAddNewProductType({ ...updatedForm });
                                        }}
                                        value={formAddNewProductType['typeName']}
                                        type={`text`}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-xl font-medium">Category</label>
                                <div className="relative bg-gray-200 rounded">
                                    <Select
                                        options={
                                            categories
                                                ? categories.map((item) => {
                                                      return {
                                                          value: item._id,
                                                          name: item.categoryName,
                                                      };
                                                  })
                                                : []
                                        }
                                        onChange={(e) => {
                                            let updatedForm = { ...formAddNewProductType };
                                            updatedForm['category'] = e.target.value;
                                            setFormAddNewProductType({ ...updatedForm });
                                        }}
                                        value={formAddNewProductType['category']}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-[80%] grid grid-cols-2 space-x-3 mb-3">
                            <div className="col-span-1">
                                <label className="block mb-2 text-xl font-medium">Original Price</label>
                                <div className="relative bg-gray-200 rounded">
                                    <Input
                                        onChange={(e) => {
                                            let updatedForm = { ...formAddNewProductType };
                                            updatedForm['originalPrice'] = e.target.value;
                                            setFormAddNewProductType({ ...updatedForm });
                                        }}
                                        value={formAddNewProductType['originalPrice']}
                                        key={``}
                                        type={`number`}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 pt-2">{``}</p>
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-xl font-medium">Sell Price</label>
                                <div className="relative bg-gray-200 rounded">
                                    <Input
                                        onChange={(e) => {
                                            let updatedForm = { ...formAddNewProductType };
                                            updatedForm['sellPrice'] = e.target.value;
                                            setFormAddNewProductType({ ...updatedForm });
                                        }}
                                        value={formAddNewProductType['sellPrice']}
                                        key={``}
                                        type={`number`}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 pt-2">{``}</p>
                            </div>
                        </div>

                        <div className="w-[80%] grid grid-cols-2 space-x-3 mb-3">
                            <div className="col-span-2">
                                <label className="block mb-2 text-xl font-medium">Mô tả</label>
                                <div className="relative bg-gray-200 rounded">
                                    <Input
                                        onChange={(e) => {
                                            let updatedForm = { ...formAddNewProductType };
                                            updatedForm['description'] = e.target.value;
                                            setFormAddNewProductType({ ...updatedForm });
                                        }}
                                        value={formAddNewProductType['description']}
                                        key={``}
                                        type={`textarea`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[80%] flex items-center gap-2 mb-5">
                            <input
                                onChange={(e) => {
                                    let updatedForm = { ...formAddNewProductType };
                                    updatedForm['isHot'] = e.target.checked;
                                    setFormAddNewProductType({ ...updatedForm });
                                }}
                                checked={formAddNewProductType['isHot']}
                                key={``}
                                type={`checkbox`}
                                id={'isHot'}
                            />
                            <label htmlFor="isHot" className="text-xl font-medium">
                                Is products hot ?
                            </label>
                        </div>

                        <div className="w-[80%] grid grid-cols-2 space-x-3 mb-3">
                            <div className="col-span-2">
                                <label className="block mb-2 text-xl font-medium">Thumbnails</label>
                                <div className="relative bg-gray-200 rounded">
                                    <UploadBox
                                        tag={'file'}
                                        data={formAddNewProductType}
                                        setData={setFormAddNewProductType}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            Object.keys(data).length === 0 ? 
                            (<button onClick={handleAddProductType} className="btn text-white bg-green-400 w-[80%] px-6 py-2 rounded">
                                Add
                            </button>)
                            :
                            (<button onClick={handleUpdateProductType} className="btn text-white bg-green-400 w-[80%] px-6 py-2 rounded">
                                Update
                            </button>)
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNewProductType;
