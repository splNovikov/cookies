import { ReactElement } from 'react';
import { RouterProvider, createBrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider, storeObserver } from './store/storeV2';

import { Auth } from './ui/Auth';
import { User } from './ui/User';
import { Front } from './ui/Front';
import { Header } from './ui/Header';

export const router = createBrowserRouter([
  // match everything with "*"
  {
    path: '*',
    element: (
      <Provider store={storeObserver}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<Front />} />
          </Routes>
        </div>
      </Provider>
    ),
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
