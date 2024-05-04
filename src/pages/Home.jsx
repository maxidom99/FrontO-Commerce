import Productos from "../components/Products/Productos"
import Catalogo from "../components/Categories/Catalogo"
import Layout from "../components/Layout"


const Home = () => {
    return (
        <>
<Layout>

        <Catalogo/>
        <Productos/>
       
</Layout>
    </>
    )
  }

export default Home