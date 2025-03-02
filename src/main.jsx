import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Set staleTime to 60 seconds for all queries
      cacheTime: 5 * 60 * 1000,

      //staleTime is the cached data time
    },
  },
})

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
