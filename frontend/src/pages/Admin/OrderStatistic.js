import { IoIosSearch } from 'react-icons/io';
import Select from '../../components/Form/Select';
import Input from '../../components/Form/Input';
import Table from '../../pages/Admin/components/Table';
import products from '../../constants/dummyData/products';

function OrderStatistic(props) {
    const sortItems = ['Newest', 'Oldest', 'Costliest', 'Cheapest', 'Ascending', 'Descending'];
    const onSelectSort = () => {};
    return (
        <div
            className={'px-4 my-4 bg-white rounded-xl mx-5 /*2sm:max-h-[80vh] 2sm:hideScrollbar 2sm:overflow-scroll*/'}
        >
            <p className="font-bold text-[25px]">Order Statistic</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-[60%] 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            selectValues={sortItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={sortItems[0]}
                        />
                    </div>
                </div>
            </div>
            <Table itemsList={products} />
        </div>
    );
}

export default OrderStatistic;
