import { baseApi } from "../../baseApi/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBulkProductImport: builder.mutation({
      query: (productsData) => ({
        url: "/products/bulk-import",
        method: "POST",
        body: productsData,
      }),
      //   invalidatesTags: ["Users"],
    }),
  }),
});

export const { useAddBulkProductImportMutation } = productApi;
