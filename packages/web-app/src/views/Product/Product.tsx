import React from "react";
import { GET_PRODUCT_QUERY } from "./query";
import { GetProductData, GetProductVars } from "./types";
import { useQuery } from "@apollo/client";
import Feedbacks from "./Feedbacks";
import { useParams, Link } from "react-router-dom";

interface IProductProps {}

const Product: React.FC<IProductProps> = () => {
  const { productSlug } = useParams();

  const { data, loading, error } = useQuery<GetProductData, GetProductVars>(
    GET_PRODUCT_QUERY,
    {
      variables: {
        productSlug,
      },
    }
  );

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.getProduct) {
    return null;
  }

  const { getProduct: product } = data;

  return (
    <div className="pb-8 bg-purple-100">
      <div className="p-3 shadow-md bg-white flex items-center justify-between mb-5">
        <Link
          className="text-xl text-purple-500 font-semibold tracking-wide cursor-pointer"
          to={`/${product.slug}`}
        >
          {product.name}
        </Link>
      </div>
      <Feedbacks product={product} />
    </div>
  );
};

export default Product;
