
import '@/assets/styles/globals.css';

export const metadata = {
    title: 'Property App',
    description: 'Find The Perfect Rental',
    keywords: 'rental, find rentals, perfect rentals'
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
          <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout