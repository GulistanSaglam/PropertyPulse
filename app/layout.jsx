import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/Global';

export const metadata = {
    title: 'Rental App',
    description: 'Find The Perfect Rental',
    keywords: 'rental, find rentals, perfect rentals'
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
    <AuthProvider>
    <html lang="en">
        <body>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
          <ToastContainer/>
        </body>
    </html>
    </AuthProvider>
    </GlobalProvider>
  )
}

export default MainLayout