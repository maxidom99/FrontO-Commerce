import Catalogo from "../components/Cliente/Categories/Catalogo"
import Layout from "../components/Layout"
import Productos from "../components/Cliente/Products/Productos"


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