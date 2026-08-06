import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Routes, Route } from 'react-router';

import { apolloClient } from '@/shared/api/apollo-client';
import { TestPage } from '@/pages/test';
import { ProfilePage } from '@/pages/profile';
import { AppLayout } from './layout/AppLayout';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/test" element={<TestPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
