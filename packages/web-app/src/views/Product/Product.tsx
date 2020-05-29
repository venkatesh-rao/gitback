import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Feedbacks from "../Feedbacks";
import { PRODUCT_QUERY } from "./query";
import { ProductData, ProductVars } from "./types";
import { IHeaderData } from "../../components/EnhancedRoutes/DefaultRoute";

interface IProductProps {
  setHeader?: (headerData: IHeaderData) => void;
}

const Product: React.FC<IProductProps> = ({ setHeader }) => {
  const { productUrl } = useParams();

  const { data, loading, error } = useQuery<ProductData, ProductVars>(
    PRODUCT_QUERY,
    {
      variables: {
        productUrl,
      },
    }
  );

  React.useEffect(() => {
    if (setHeader && data?.product) {
      const { name: title, url: link } = data.product;
      setHeader({ title, link });
    }
  }, [data, setHeader]);

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

  return <Feedbacks product={product} />;
};

export default Product;
