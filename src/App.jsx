import { createBrowserRouter, RouterProvider } from 'react-router';
import SurveyForm from './component/FormSurvey';
import TableResponse from './component/TableResponse';


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
  return <RouterProvider router={router} />;
}

export default App;