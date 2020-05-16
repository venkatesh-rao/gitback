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
    <div className="pb-8 bg-purple-100 min-h-screen">
      <div className="p-3 shadow-md bg-white flex items-center justify-between mb-5">
        <Link
          className="text-xl text-purple-500 font-semibold tracking-wide cursor-pointer"
          to={`/${product.url}`}
        >
          {product.name}
        </Link>
      </div>
      <Feedbacks product={product} />
    </div>
  );
};

export default Product;
