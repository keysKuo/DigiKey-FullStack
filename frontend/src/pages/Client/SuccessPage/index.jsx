import React from 'react';
import { LuCheck, LuCheckCircle } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';

export default function SuccessPage() {
    const { transactionId } = useParams();

    return (
        <>
            <div className="py-5"></div>
            <div className="w-[800px] min-h-[47svh] mx-auto shadow-xl bg-white flex flex-col items-center justify-center gap-5">
                <LuCheckCircle size={100} color="#71b190" />
                <h1 className="text-[3rem] font-bold">Thanh toán thành công</h1>
                <p>
                    Mã số đơn hàng của bạn là <span className="text-cyan-700">{transactionId}</span>
                </p>
                <p>Hãy kiểm tra email của bạn để nhận hàng</p>
                <Link to={'/'} className="bg-[#71b190] px-6 py-4 rounded-lg mt-5 text-white">Tiếp tục mua hàng</Link>
            </div>
            <div className="py-5"></div>
        </>
    );
}
