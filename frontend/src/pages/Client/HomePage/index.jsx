import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET_productTypes } from '../../../services/products';
import { GET_categories } from '../../../services/categories';
import useFetch from '../../../hooks/useFetch';

import { homePageBanners, homePageSlider } from '../../../assets/img';
import Banner from './Banner';
import Section from './Section';
import ProductCard from '../components/ProductCard';

function HomePage() {
    const { fetch, error, loading } = useFetch();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Loading Products Types
    useEffect(() => {
        const loadProductTypes = async () => {
            const options = GET_productTypes();
            setProducts(await fetch(options));
        };

        loadProductTypes();
    }, []);

    // Loading Categories
    useEffect(() => {
        const loadCategories = async () => {
            const options = GET_categories();
            setCategories(await fetch(options));
        };

        loadCategories();
    }, []);

    return (
        <>
            <>
                <div className="bg-gray-100 w-full">
                    <Banner banners={homePageBanners} sliders={homePageSlider} />

                    {products?.length !== 0 && (
                        <>
                            {/* Sản phẩm nổi bật */}
                            <Section
                                title="Sản phẩm nổi bật"
                                subTitle="Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích"
                                products={products?.filter((product) => product.isHot === 1)}
                            >
                                {products?.map((product, index) => {
                                    if (product.isHot == 1) {
                                        const imgUrl = product.image.data.attributes.url;
                                        return (
                                            <ProductCard
                                                key={index}
                                                name={product.typeName}
                                                link={`/san-pham/${product.slug}`}
                                                price={product.originalPrice}
                                                discount={
                                                    100 - Math.floor((product.sellPrice / product.originalPrice) * 100)
                                                }
                                                img={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`}
                                                status={product.status}
                                            />
                                        );
                                    }
                                })}
                            </Section>

                            {/* Danh mục nổi bật */}
                            <Section
                                title={'Danh mục nổi bật'}
                                hideBtn={true}
                                styles={'grid grid-cols-6 gap-10 sm:grid-cols-3 sm:gap-3 2sm:grid-cols-3 2sm:gap-3'}
                            >
                                {categories?.map((cate, index) => {
                                    const color = cate.color;
                                    return (
                                        <Link
                                            key={index}
                                            style={{ backgroundColor: color}}
                                            to={'/search/featured'}
                                            className={`rounded-xl text-center py-8 px-2 sm:p-[3px] 2sm:p-[3px] sm:text-[10px] text-white`}
                                        >
                                            {cate.categoryName}
                                        </Link>
                                    );
                                })}
                            </Section>
                            
                            {/* Sản phẩm theo từng danh mục */}
                            {categories?.map((category, index) => {
                                return (
                                    <Section key={index} title={category.categoryName} products={products}>
                                        {products?.map((product, index) => {
                                            const imgUrl = product.image.data.attributes.url;
                                            const categoryId = product.category.data.attributes.categoryId;
                                            if (categoryId === category.categoryId) {
                                                return (
                                                    <ProductCard
                                                        key={index}
                                                        name={product.typeName}
                                                        link={`/san-pham/${product.slug}`}
                                                        price={product.originalPrice}
                                                        discount={
                                                            100 -
                                                            Math.floor(
                                                                (product.sellPrice / product.originalPrice) * 100,
                                                            )
                                                        }
                                                        img={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`}
                                                        status={product.status}
                                                    />
                                                );
                                            }
                                        })}
                                    </Section>
                                );
                            })}
                        </>
                    )}
                </div>
            </>
        </>
    );
}

export default HomePage;
