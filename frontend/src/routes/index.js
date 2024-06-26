import Page404 from '../components/Page404';
import Login from '../pages/Admin/Login';
import Register from '../pages/Client/Register';

import Layout from '../components/Layout';
import HomePage from '../pages/Client/HomePage';
import ProductsPage from '../pages/Client/ProductsPage';
import ProductDetailPage from '../pages/Client/ProductDetailPage';
import CartPage from '../pages/Client/CartPage';
import ThankYou from '../pages/Client/ThankYou';

import Dashboard from '../pages/Admin/Dashboard';
import ManageProductsPage from '../pages/Admin/ManageProductsPage';
import ManageProductTypesPage from '../pages/Admin/ManageProductTypesPage';
import OrderStatistic from '../pages/Admin/OrderStatistic';
import Accounts from '../pages/Admin/Accounts';
import SuccessPage from '../pages/Client/SuccessPage';
const publicRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: Layout,
    },
    {
        path: '/search/featured',
        component: ProductsPage,
        layout: Layout,
    },
    {
        path: '/checkout/success/:transactionId',
        component: SuccessPage,
        layout: Layout,
    },
    {
        path: '/san-pham/:slug',
        component: ProductDetailPage,
        layout: Layout,
    },
    {
        path: '/cart',
        component: CartPage,
        layout: Layout,
    },
    {
        path: '/login',
        component: Login,
        layout: '',
    },
    {
        path: '/register',
        component: Register,
        layout: '',
    },
    {
        path: '/404',
        component: Page404,
        layout: Layout,
    },
    {
        path: '/thankyou',
        component: ThankYou,
        layout: Layout,
    },
    {
        path: '/admin/login',
        component: Login,
        layout: '',
    },
    {
        path: '/admin',
        component: Dashboard,
        layout: Layout,
    },
    {
        path: '/admin/products',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/productTypes',
        component: ManageProductTypesPage,
        layout: Layout,
    },
    {
        path: '/admin/order',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/order/statistic',
        component: OrderStatistic,
        layout: Layout,
    },
    {
        path: '/admin/account',
        component: Accounts,
        layout: Layout,
    },
    {
        path: '/admin/discount',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/website',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/payment',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/employee',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/userSupport',
        component: ManageProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/404',
        component: Page404,
        layout: Layout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
