import { FaFileInvoiceDollar } from 'react-icons/fa';
import { TfiDashboard, TfiDropboxAlt, TfiSettings } from 'react-icons/tfi';
import { MdSupervisorAccount, MdOutlineDiscount, MdOutlineContactSupport } from 'react-icons/md';

const AdminSidebarItems = [
    {
        title: 'Dashboard',
        url: '/admin',
        icon: TfiDashboard,
        child: [],
    },
    {
        title: 'Products',
        url: '',
        icon: TfiDropboxAlt,
        child: [
            {
                title: 'Manage Product',
                url: '/admin/products',
            },
            {
                title: 'Manage Product Types',
                url: '/admin/productTypes',
            },
        ],
    },
    {
        title: 'Order',
        url: '',
        icon: FaFileInvoiceDollar,
        child: [
            // {
            //     title: 'Manage Order',
            //     url: '/admin/order',
            // },
            {
                title: 'Order Statistic',
                url: '/admin/order/statistic',
            },
        ],
    },
    {
        title: 'Account',
        url: '/admin/account',
        icon: MdSupervisorAccount,
        child: [],
    },
    {
        title: 'Discount & Coupon',
        url: '/admin/discount',
        icon: MdOutlineDiscount,
        child: [],
    },
    {
        title: 'Settings',
        url: '',
        icon: TfiSettings,
        child: [
            {
                title: 'Website Setting',
                url: '/admin/setting/website',
            },
            {
                title: 'Payment Setting',
                url: '/admin/setting/payment',
            },
            {
                title: 'Manage Employee',
                url: '/admin/setting/employee',
            },
        ],
    },
    {
        title: 'Help & Support',
        url: '/admin/userSupport',
        icon: MdOutlineContactSupport,
        child: [],
    },
];

export { AdminSidebarItems as SidebarItems };
