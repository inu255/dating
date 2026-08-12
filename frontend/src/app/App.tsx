import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Routes, Route } from 'react-router';

import { apolloClient } from '@/shared/api/apollo-client';
import { ProfilePage } from '@/pages/profile';
import { FeedPage } from '@/pages/feed';
import { AppLayout } from './layout/AppLayout';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<FeedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
