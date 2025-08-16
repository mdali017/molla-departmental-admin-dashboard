import { baseApi } from "../../baseApi/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBulkProductImport: builder.mutation({
      query: (productsData) => ({
        url: "/products/bulk-import",
        method: "POST",
        body: productsData,
      }),
      invalidatesTags: ["Products"],
    }),

    // for get all products
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/products`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddBulkProductImportMutation, useGetAllProductsQuery } =
  productApi;
