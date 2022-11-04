import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
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
    const products = await ProductModel.find({}).lean()
    db.disconnect()
    return {
    props:{
    products:products.map((doc)=>db.convertDocToObj(doc))
    }
  }

  } catch {
    return {
      notFound:true
    }
  }


  
  

  

  

  
}