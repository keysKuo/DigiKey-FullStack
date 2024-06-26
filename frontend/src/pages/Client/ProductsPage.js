import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

import ProductCard from './components/ProductCard';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import products from '../../constants/dummyData/products';
// start dummy data
import { categories, genres, sortOptions } from '../../constants/dummyData';
// end dummy data
function ProductsPage(props) {
    const [filterOptions, setFilterOptions] = useState({
        category: 'Tất cả',
        genre: 'Tất cả',
        upperPrice: 0,
        lowerPrice: 0,
        sortOption: 'Mặc định',
    });

    const handleOnFilterOptionsChange = (data) => {
        setFilterOptions({ ...filterOptions, [Object.keys(data)[0]]: Object.values(data)[0] });
    };

    const handleOnResetFilter = () => {
        setFilterOptions({
            category: 'Tất cả',
            genre: 'Tất cả',
            upperPrice: 0,
            lowerPrice: 0,
            sortOption: 'Mặc định',
        });
    };

    return (
        <div className="w-full flex justify-center items-center p-7 bg-gray-100">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="font-bold text-[31.5px]">Tìm kiếm sản phẩm</div>
                <form className="flex justify-between gap-10 items-center md:flex-wrap md:justify-normal md:gap-[14px] sm:flex-wrap sm:gap-2 2sm:flex-wrap 2sm:gap-2">
                    <Select
                        id={'category'}
                        selectValues={categories}
                        value={filterOptions.category}
                        label={'Danh mục'}
                        placeHolder={'Tất cả'}
                        onSelect={handleOnFilterOptionsChange}
                        customClass={'md:w-[49%]'}
                    />
                    <Select
                        id={'genre'}
                        selectValues={genres}
                        value={filterOptions.genre}
                        label={'Thể Loại'}
                        placeHolder={'Tất cả'}
                        onSelect={handleOnFilterOptionsChange}
                        customClass={'md:w-[49%]'}
                    />
                    <div className="flex items-center gap-3 xl:w-[250%] lg:w-[150%] md:gap-[14px] md:w-[49%] sm:w-full 2sm:w-full">
                        <p className="whitespace-nowrap lg:hidden md:hidden sm:hidden 2sm:hidden">Mức giá: </p>
                        <Input
                            type={'number'}
                            id={'upperPrice'}
                            value={filterOptions.upperPrice}
                            label={'Mức giá từ'}
                            placeHolder={'Mức giá từ'}
                            onChange={handleOnFilterOptionsChange}
                            customClass={'md:w-[49%]'}
                        />
                        <p className="lg:hidden md:hidden sm:hidden 2sm:hidden">-</p>
                        <Input
                            type={'number'}
                            id={'lowerPrice'}
                            value={filterOptions.lowerPrice}
                            label={'Mức giá đến'}
                            placeHolder={'Mức giá đến'}
                            onChange={handleOnFilterOptionsChange}
                            customClass={'md:w-[49%]'}
                        />
                    </div>
                    <Select
                        id={'sortOption'}
                        selectValues={sortOptions}
                        value={filterOptions.sortOption}
                        label={'Sắp xếp'}
                        placeHolder={'Sắp xếp'}
                        onSelect={handleOnFilterOptionsChange}
                        customClass={'md:w-[49%]'}
                    />
                    <Link
                        // to={'/search/featured'}
                        // onClick={handleOnClickFilter}
                        className="bg-orange-300 text-white p-[7px] flex items-center rounded-lg font-semibold text-center hover:opacity-80 md:justify-items-start"
                    >
                        <FiFilter className="h-[20px] w-[20px]" /> Lọc
                    </Link>
                </form>
                <div
                    className="text-red-300 flex justify-start items-center gap-3 pb-3 cursor-pointer"
                    onClick={handleOnResetFilter}
                >
                    <FiRefreshCw />
                    Khôi phục bộ lọc
                </div>
                <div className="grid grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-3 2sm:grid-cols-2 2sm:gap-3">
                    {products.map((product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                name={product.name}
                                link={product.url}
                                price={product.originPrice}
                                discount={product.discount}
                                img={product.img}
                                status={product.status}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;
