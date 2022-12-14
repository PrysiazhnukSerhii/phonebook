import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),

    createContact: builder.mutation({
      query: contact => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deletContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),

    updateContact: builder.mutation({
      query: ({ id, contact }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeletContactMutation,
  useUpdateContactMutation,
} = contactsApi;
