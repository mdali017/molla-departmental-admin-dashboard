import { baseApi } from "../../baseApi/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
