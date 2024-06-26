import { Link } from 'react-router-dom';

import { IoIosInformationCircle } from 'react-icons/io';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { formatCash, splitCamelText } from '../../../utils/helpers';
function Table(props) {
    const { itemsList } = props;
    const ignoreAttr = ['img', 'id', 'url', 'category'];
    const attributes = [
        ...Object.keys(itemsList[0])
            .map((key) => (!ignoreAttr.includes(key) ? splitCamelText(key) : null))
            .filter((item) => item),
    ];

    return (
        <div className="max-h-[60vh] hideScrollbar overflow-scroll lg:max-h-[80vh] md:max-h-[75vh] sm:max-h-[68vh] 2sm:max-h-[80vh]">
            <div className="h-full lg:w-[1240px] md:w-[991px] sm:w-[768px] 2sm:w-[768px]">
                <div
                    className={`grid grid-cols-${
                        attributes.length + 3
                    } gap-3 font-bold bg-gray-200 p-4 rounded-xl capitalize sticky top-0 `}
                >
                    {attributes.map((attribute, index) => {
                        return index === 0 ? (
                            <p key={index} className="col-span-3">
                                {attribute}
                            </p>
                        ) : (
                            <p key={index}>{attribute}</p>
                        );
                    })}
                    <p></p>
                </div>
                <hr className="h-px w-full bg-gray-200 border-0"></hr>
                <div className="overflow-y-scroll hideScrollbar">
                    {itemsList.map((item, index) => {
                        return (
                            <Link key={index} className="grid grid-cols-8 gap-5 items-center p-4">
                                <div className="col-span-3 flex gap-3 items-center">
                                    <img src={item.img} alt={item.name} className="w-[50%] rounded-xl" />
                                    <p className="limitNumbLine">{item.name}</p>
                                </div>
                                <p className="font-bold">{formatCash(item.originPrice)}</p>
                                <p>{100 - Math.floor(item.discount / item.originPrice * 100)}</p>
                                <p>{item.stockQuantity}</p>
                                <p>{item.status}</p>
                                <div
                                    className="flex items-center justify-center gap-5"
                                    onClick={(event) => event.preventDefault()}
                                >
                                    <IoIosInformationCircle className="text-[28px] text-blue-500" />
                                    <FaEdit className="text-[27px] text-yellow-400" />
                                    <FaTrashAlt className="text-[22px] text-red-300" />
                                </div>
                                <hr className="h-px col-span-full my-4 bg-gray-200 border-0"></hr>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Table;
