import Productos from "../components/Productos"
import Catalogo from "../components/Catalogo"
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