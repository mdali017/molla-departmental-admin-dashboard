import { baseApi } from "../../baseApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "users/login",
        method: "POST",
        body: userInfo,
      }),
      //   invalidatesTags: ["Users"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
