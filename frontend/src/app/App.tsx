import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Routes, Route } from 'react-router';

import { apolloClient } from '@/shared/api/apollo-client';
import { TestPage } from '@/pages/test';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
