import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://molla-departmental-server-new.vercel.app/api/v1",
  }),
  tagTypes: ["Products", "Movies", "ShowTime", "Payment"],
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
    updateProduct: builder.mutation({
      query: ({ data, productId }) => ({
        url: `/products/update-product/${productId}`, // Fixed template literal syntax
        method: "PATCH",
        body: data,
      }),
      // Add invalidatesTags for automatic cache updates
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: any) => {
        return {
          url: `/products/delete-product/${id}`,
          method: "DELETE",
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
    updateOrderStatus: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/orders/update-order-status/${id}`,
          method: "PATCH", // Use PATCH method for partial update
          body: data,
        };
      },
    }),
    userLogin: builder.mutation({
      query: (data: any) => {
        return {
          url: `/users/login`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useAddNewProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useUserLoginMutation,
} = baseApi;
