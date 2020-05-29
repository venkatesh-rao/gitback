import React from "react";
import { IUser, ProductsData } from "./types";
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
            className="border-l-8 border-transparent hover:border-purple-700 bg-white rounded-md shadow-md w-full max-w-xs py-3 px-6 mr-0 mb-6 md:mr-6 md:mb-0"
          >
            <h6 className="text-xl w-full text-purple-500 font-semibold mb-2">
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
            <div className="flex flex-row items-center rounded-md text-gray-700">
              <GoRepo className="inline-block mr-1" />
              <div>{product.repositoryName}</div>
            </div>
          </Link>
        );
      })}
      <Link
        to="/create-product"
        className="flex flex-col items-center justify-center rounded-md w-full max-w-xs px-2 border-2 border-dashed border-purple-500 mb-6 md:mb-0"
      >
        <div className="text-4xl text-purple-500">+</div>
      </Link>
    </div>
  );
};

export default Home;
