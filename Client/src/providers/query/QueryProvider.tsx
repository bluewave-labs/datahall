"use client";

import React from 'react';

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontSize: '1rem' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
