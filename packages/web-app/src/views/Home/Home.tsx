import React from "react";
import { IUser, ProductsData } from "./types";
import { PRODUCTS_QUERY } from "./query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GoRepo } from "react-icons/go";

export interface IHomeProps {
  loggedInUser?: IUser;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { data, loading, error } = useQuery<ProductsData>(PRODUCTS_QUERY);

  if (loading) {
    return <p>Error</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.products) {
    return null;
  }

  return (
    <div className="p-3 flex flex-row flex-wrap">
      {data.products.map((product) => {
        return (
          <Link
            to={`/${product.slug}`}
            className="bg-white flex flex-col items-center rounded-md shadow-md w-full max-w-xs px-2 duration-200 transform hover:-translate-y-1 mr-0 mb-6 md:mr-6 md:mb-0"
          >
            <div className="text-xl w-full text-center my-2 text-purple-500 font-semibold">
              {product.name}
            </div>
            <div className="inline-flex flex-row justify-center my-4">
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
            </div>
            <div className="flex flex-row items-center rounded-md text-gray-700 my-2 p-1">
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
