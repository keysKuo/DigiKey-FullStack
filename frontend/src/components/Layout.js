import { useLocation } from 'react-router-dom';

import { ClientHeader } from '../pages/Client/components/Header';
import { ClientFooter } from '../pages/Client/components/Footer';
import { AdminHeader } from '../pages/Admin/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialWidgets from './SocialWidgets';

function Layout(props) {
    const { children } = props;
    const location = useLocation();

    return location.pathname.includes('admin') ? (
            <AdminHeader>
                {children}
            </AdminHeader>
    ) : (
        <>
            <ClientHeader />
            <SocialWidgets />
            <ToastContainer />
            {children}
            <ClientFooter />
        </>
    );
}

export default Layout;
