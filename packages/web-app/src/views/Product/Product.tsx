import React from "react";
import { PRODUCT_QUERY } from "./query";
import { ProductData, ProductVars } from "./types";
import { useQuery } from "@apollo/client";
import Feedbacks from "../Feedbacks";
import { useParams, Link } from "react-router-dom";
import Error from "../../components/Error/Error";

interface IProductProps {}

const Product: React.FC<IProductProps> = () => {
  const { productUrl } = useParams();

  const { data, loading, error } = useQuery<ProductData, ProductVars>(
    PRODUCT_QUERY,
    {
      variables: {
        productUrl,
      },
    }
  );

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <Error errorType="404" />;
  }

  if (!data || !data.product) {
    return null;
  }

  const { product } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="h-12 fixed top-0 left-0 right-0 flex items-center justify-between flex-wrap bg-white px-3 shadow-md z-10">
        <div className="flex items-center flex-grow mr-6">
          <Link
            className="text-purple-700 font-semibold text-xl tracking-wide"
            to={`/${product.url}`}
          >
            {product.name}
          </Link>
        </div>
      </nav>
      <main className="pt-16 pb-3 px-6 bg-purple-100 flex-1 flex-grow">
        <Feedbacks product={product} />
      </main>
    </div>
  );
};

export default Product;
