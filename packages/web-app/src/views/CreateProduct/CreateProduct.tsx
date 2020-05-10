import React from "react";
import {
  Formik,
  FormikProps,
  FormikHelpers,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import { ListAppRepositoriesData } from "../ListRepositories/types";
import { LIST_REPOSITORIES_QUERY } from "../ListRepositories/query";
import { useQuery } from "@apollo/client";

interface CreateProductProps {}

interface CreateProductValues {
  productName: string;
  repository: string;
}

const CreateProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  repository: Yup.string().required("Required"),
});

const CreateProduct: React.FC<CreateProductProps> = (props) => {
  const { data, loading, error } = useQuery<ListAppRepositoriesData>(
    LIST_REPOSITORIES_QUERY
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.listAppRepositories) {
    return null;
  }

  const initialValues: CreateProductValues = {
    productName: "",
    repository: "",
  };

  return (
    <div className="w-full md:w-3/4 lg:w-2/5 mx-auto my-4 p-4 bg-purple-100 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">
        Create a product
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateProductSchema}
        onSubmit={(
          values: CreateProductValues,
          actions: FormikHelpers<CreateProductValues>
        ) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        render={(formProps: FormikProps<CreateProductValues>) => {
          return (
            <Form>
              <div className="w-full mx-auto px-8 pt-6 pb-8 mb-4 bg-white shadow-sm rounded-md">
                <Field name="productName">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-1">
                          <label
                            className="block text-purple-500 text-xs font-bold uppercase"
                            htmlFor="productName"
                          >
                            Product name*
                          </label>
                          {meta.touched && meta.error && (
                            <span className="block text-xs text-red-500">
                              {meta.error}
                            </span>
                          )}
                        </div>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                          type="text"
                          id="productName"
                          placeholder="Product name"
                          {...field}
                        />
                      </div>
                    );
                  }}
                </Field>
                <Field name="repository">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-1">
                          <label
                            className="block text-gray-700 text-xs font-bold uppercase"
                            htmlFor="repository"
                          >
                            Repository*
                          </label>
                          {meta.touched && meta.error && (
                            <span className="block text-xs text-red-500">
                              {meta.error}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <select
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="repository"
                            {...field}
                          >
                            <option value="">Select a repository</option>
                            {data.listAppRepositories.map((repo) => {
                              return (
                                <option key={repo.id} value={repo.id}>
                                  {repo.name}
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Field>
                <button
                  className="w-full duration-200 ease-in-out mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default CreateProduct;
