import { createBrowserRouter, RouterProvider } from 'react-router';
import SurveyForm from './component/FormSurvey';
import TableResponse from './component/TableResponse';

import { Provider } from 'react-redux';
import store from './redux/store';
import ModalGlobal from './component/ModalGlobal';


// Konfigurasi Peta Rute URL halaman
const router = createBrowserRouter([

  {
    path: "/",
    element: <SurveyForm />,
  },
  {
    path: "/response",
    element: <TableResponse />,
  }
])

function App() {
  // Jalankan konfigurasi router ke dalam aplikasi React
  return (
  <Provider store={store}>
    <RouterProvider router={router} />
    <ModalGlobal />
  </Provider>
  )
}

export default App;

