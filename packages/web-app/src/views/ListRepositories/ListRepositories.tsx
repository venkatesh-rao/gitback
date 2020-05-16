import { useQuery } from "@apollo/client";
import { GoRepo } from "react-icons/go";
import React from "react";
import { REPOSITORIES_QUERY } from "./query";
import { RepositoriesData, Repository } from "./types";

interface IListRepositoriesProps {}

const ListRepositories: React.FC<IListRepositoriesProps> = () => {
  const { data, loading, error } = useQuery<RepositoriesData>(
    REPOSITORIES_QUERY
  );

  if (loading) {
    return <p>Error</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.repositories) {
    return null;
  }

  return (
    <div className="w-full md:w-3/4 lg:w-2/5 mx-auto my-12 p-4 bg-purple-100">
      <h2 className="text-gray-900 mb-1 text-sm">Repositories</h2>
      <div className="w-full mx-auto p-2 bg-white shadow-md rounded-md">
        {data.repositories.map((repo: Repository) => {
          return (
            <div className="flex items-center w-full p-2 cursor-pointer transition ease-in duration-100 rounded-md bg-transparent text-gray-800 hover:bg-purple-100">
              <GoRepo className="-mb-1 mr-2" /> <span>{repo.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListRepositories;
