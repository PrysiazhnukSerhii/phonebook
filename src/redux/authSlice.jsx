import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userInformation.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    signUpUser: builder.mutation({
      query: registerInform => ({
        url: `/users/signup`,
        method: 'POST',
        body: registerInform,
      }),
    }),
    login: builder.mutation({
      query: userInformation => {
        return {
          url: `/users/login`,
          method: 'POST',
          body: userInformation,
        };
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
    }),
    getUserInformation: builder.query({
      query: () => `/users/current`,
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginMutation,
  useLogOutMutation,
  useGetUserInformationQuery,
} = authApi;

