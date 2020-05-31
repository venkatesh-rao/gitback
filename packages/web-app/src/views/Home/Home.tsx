import React from "react";
import { ProductsData } from "./types";
import { IUser } from "../../components/EnhancedRoutes/types";
import { PRODUCTS_QUERY } from "./query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GoRepo } from "react-icons/go";
import Error from "../../components/Error/Error";

export interface IHomeProps {
  loggedInUser?: IUser;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { data, loading, error } = useQuery<ProductsData>(PRODUCTS_QUERY);

  if (loading) {
    return <p>Error</p>;
  }

  if (error) {
    return <Error errorType="bug" />;
  }

  if (!data || !data.products) {
    return null;
  }

  return (
    <div className="p-3 flex flex-row flex-wrap">
      {data.products.map((product) => {
        return (
          <Link
            to={`/${product.url}`}
            className="bg-white rounded-md shadow-md w-full max-w-xs p-3 mr-0 mb-6 md:mr-6 md:mb-0"
          >
            <h6 className="text-xl w-full text-purple-500 font-semibold mb-2 text-center">
              {product.name}
            </h6>
            {/* <div className="inline-flex flex-row m-4">
              {product.developers.map((developer, index) => {
                return (
                  <span
                    key={index}
                    className="flex items-center justify-center bg-purple-500 w-8 h-8 rounded-full relative overflow-hidden shadow-sm  -m-2"
                  >
                    <div className="text-white">
                      {developer.username.charAt(0).toUpperCase()}
                    </div>
                  </span>
                );
              })}
            </div> */}
            <div className="flex flex-row items-center justify-center rounded-md text-gray-700">
              <GoRepo className="inline-block mr-1" />
              <div>{product.repositoryName}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
