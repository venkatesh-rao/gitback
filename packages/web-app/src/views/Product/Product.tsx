import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Feedbacks from "../Feedbacks";
import { PRODUCT_QUERY } from "./query";
import { ProductData, ProductVars } from "./types";
import { IUser } from "../../components/EnhancedRoutes/types";
import Layout from "../../layout";

interface IProductProps {
  user?: IUser;
}

const Product: React.FC<IProductProps> = ({ user }) => {
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
    <Layout.PublicLayout
      title={product.name}
      titleLink={`/${product.url}`}
      user={user}
    >
      <Feedbacks product={product} />
    </Layout.PublicLayout>
  );
};

export default Product;
