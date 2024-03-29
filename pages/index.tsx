import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import Layout from '../components/Layout'
import { productsType} from '../typeScriptTypes'
import ProductList from '../components/ProductList'
import ProductModel from '../models/products.schema'
import db from '../utils/db'






const Home: NextPage<productsType> = ({ products }:productsType) => {
  const router = useRouter()

  useEffect(() => {

    const card2 = document.getElementsByClassName("reveal")[0]


    const reveal = () => {
      const revealPoint = 100
      const winHeight = window.innerHeight
        if (revealPoint < (winHeight - card2.getBoundingClientRect().top)) {
          card2.classList.add("active")
        } else {
          card2.classList.remove("active")
        }
        
      
    }
    
    window.addEventListener("scroll", reveal)

  },[])

  return (
    <Layout title='Home' description='Drones Sales Website'>
      <div className="homePage">
        {products.length === 0 ? <div>Error In Connection Please Try To Refresh</div> : (<Fragment>
          <ProductList products={products}/>
        </Fragment>)}

          
      </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {


  try {
    db.connect()
    const res = await ProductModel.find({}).lean()
    const products =  res.map((doc) => db.convertDocToObj(doc))
    db.disconnect()
   
    return {
    props:{
    products
    }
  }

  } catch {
    return {
      notFound:true
    }
  }


  
  

  

  

  
}