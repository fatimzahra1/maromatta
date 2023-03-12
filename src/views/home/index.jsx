import  {  ArrowRightOutlined  }  from  "@ant-design/icons";
import  {  MessageDisplay  }  from  "../../components/common";
import  {  ProductShowcaseGrid  }  from  "../../components/product";
import  {  FEATURED_PRODUCTS,  RECOMMENDED_PRODUCTS,  SHOP  }  from  "../../constants/routes";
import  {
    useDocumentTitle,  useFeaturedProducts,  useRecommendedProducts,  useScrollTop
}  from  "../../hooks";
import  bannerImg  from  "../../images/banner-girl.png";
import  React  from  "react";
import  {  Link  }  from  "react-router-dom";


const  Home  =  ()  =>  {
    useDocumentTitle("Maromatta  |  Hem");
    useScrollTop();

    const  {
        featuredProducts,
        fetchFeaturedProducts,
        isLoading:  isLoadingFeatured,
        error:  errorFeatured
    }  =  useFeaturedProducts(6);
    const  {
        recommendedProducts,
        fetchRecommendedProducts,
        isLoading:  isLoadingRecommended,
        error:  errorRecommended
    }  =  useRecommendedProducts(6);

    return  (
        <main  className="content">
            <div  className="home">
                <div  className="banner">
                    <div  className="banner-desc">
                        <h1  className="text-thin">
                            <strong>Gör  ditt  hem till ditt hem</strong>
                        </h1>
                        <p>
                          Att  köpa  våra  handgjorda  mattor  kommer  att  göra  både  ditt  hem  och  din  ficka  lycklig.
                        </p>
                        <br  />
                        <Link  to={SHOP}  className="button">
                            shoppa  nu  &nbsp;
                            <ArrowRightOutlined  />
                        </Link>
                    </div>
                    <div  className="banner-img"><img  src={bannerImg}  alt=""  /></div>
                </div>
                <div  className="display">
                    <div  className="display-header">
                        <h1>Utvalda  produkter</h1>
                        <Link  to={FEATURED_PRODUCTS}>Se  Allt</Link>
                    </div>
                    {(errorFeatured  &&  !isLoadingFeatured)  ?  (
                        <MessageDisplay
                            message={errorFeatured}
                            action={fetchFeaturedProducts}
                            buttonLabel="försök  igen"
                        />
                    )  :  (
                        <ProductShowcaseGrid
                            products={featuredProducts}
                            skeletonCount={6}
                        />
                    )}
                </div>
                <div  className="display">
                    <div  className="display-header">
                        <h1>rekommenderade  produkter</h1>
                        <Link  to={RECOMMENDED_PRODUCTS}>Se  Allt</Link>
                    </div>
                    {(errorRecommended  &&  !isLoadingRecommended)  ?  (
                        <MessageDisplay
                            message={errorRecommended}
                            action={fetchRecommendedProducts}
                            buttonLabel="försök  igen"
                        />
                    )  :  (
                        <ProductShowcaseGrid
                            products={recommendedProducts}
                            skeletonCount={6}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export  default  Home;
