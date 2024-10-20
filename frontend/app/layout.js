import Navbar from './components/Navbar';
import SearchFilterDropdown from './components/SearchFilterDropdown';
import { SearchProvider } from './context/SearchContext';
export const metadata = {
  title: 'COOKBOOK',
  description: 'Recipe Inspo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>  {/* Wrap the entire app in the context provider */}
          <Navbar />      {/* Navbar will remain on the screen */}
          <SearchFilterDropdown/>
          {children}      {/* Render the page-specific content */}
        </SearchProvider>
      </body>
    </html>
  )
}
