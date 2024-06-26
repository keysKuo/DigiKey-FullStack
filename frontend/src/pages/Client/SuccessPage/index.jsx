import React, { useEffect } from 'react';
import { LuCheck, LuCheckCircle } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { GET_checkPaymentDetail } from '../../../services/payments';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PUT_completeTransaction } from '../../../services/transactions';
import useFetch from '../../../hooks/useFetch';

export default function SuccessPage() {
    const { transactionId } = useParams();
    const { fetch, error, loading } = useFetch();

    useEffect(() => {
        const completeTransaction = async (id) => {
            const options = PUT_completeTransaction(id);
            await fetch(options);
            if (!error) {
                toast("🚀 Đơn hàng đã được thanh toán");
            }
        }

        const checkPaymentDetails = async () => {
            const options = GET_checkPaymentDetail(transactionId);
            await axios.request(options)
                .then(response => response.data)
                .then(result => {
                    const { transaction } = result;
                    completeTransaction(transaction.id);
                })
                .catch(err => toast("Đã có lỗi xãy ra"));
        }

        checkPaymentDetails();
    }, [])

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
