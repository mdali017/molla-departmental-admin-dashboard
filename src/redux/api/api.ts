import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: "https://moniharcineplexpimainapi.icicle.dev/api",
  }),
  tagTypes: ["Bookings", "Movies", "ShowTime", "Payment"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          url: `/categories`,
          method: "GET",
        };
      },
    }),
    addCategory: builder.mutation({
      query: (data: any) => {
        return {
          url: `/categories/create-category`,
          method: "POST",
          body: data,
        };
      },
    }),
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/products`,
          method: "GET",
        };
      },
    }),
    addNewProduct: builder.mutation({
      query: (data: any) => {
        return {
          url: `/products/create-product`,
          method: "POST",
          body: data,
        };
      },
    }),
    getAllOrders: builder.query({
      query: () => {
        return {
          url: `/orders`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useGetAllProductsQuery,
  useAddNewProductMutation,
  useGetAllOrdersQuery,
} = baseApi;
