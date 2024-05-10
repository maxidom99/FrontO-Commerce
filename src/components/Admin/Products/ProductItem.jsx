import { 
    Card, 
    CardBody, 
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    Icon

} from "@chakra-ui/react"

import { FaCartPlus } from "react-icons/fa";

export default function ProductItem({product, addToCart}){

    const { descripcion, nombres, precios, img_product} = product


    return(
       <Card maxW='sm' className="shadow-xl hover:scale-105 transition-all duration-300 delay-150" >
  <CardBody >
    <Image
      src={img_product}
      alt='img_product'
      borderRadius='lg' className="w-full border  h-64 object-cover"
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{nombres}</Heading>
      <Text>
        {descripcion}
      </Text>
      <Text color='zinc.600' fontSize='2xl' className="font-semibold">
        ${precios}
      </Text>
    </Stack>
  </CardBody>
  <Divider className="text-zinc-400 "/>
  <CardFooter>
    <ButtonGroup >
      <Button className="mr-2">
        Comprar ahora
      </Button>
      <div className="border-2 rounded border-black h-9 mr-2"></div>
      <Button onClick={() => addToCart(product)}>
        <Icon as={FaCartPlus} viewBox="0 0 200 200" className="text-sm" />
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    )
}


