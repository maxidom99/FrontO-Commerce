import Navbar from './NavbarAdm'
import Footer from './FooterAdm'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout