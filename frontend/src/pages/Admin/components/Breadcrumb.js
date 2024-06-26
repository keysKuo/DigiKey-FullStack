import { Link } from 'react-router-dom';

function Breadcrumb(props) {
    const { location } = props;
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="pl-5 bg-white">
            {pathnames.map((path, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <span key={index} className="capitalize text-orange-500">
                        {path}
                    </span>
                ) : (
                    <span key={index} className="capitalize">
                        <Link to={routeTo}>{path}</Link> {' / '}
                    </span>
                );
            })}
        </div>
    );
}

export default Breadcrumb;
