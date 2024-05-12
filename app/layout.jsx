import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'Property App',
    description: 'Find The Perfect Rental',
    keywords: 'rental, find rentals, perfect rentals'
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <html lang="en">
        <body>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </body>
    </html>
    </AuthProvider>
  )
}

export default MainLayout