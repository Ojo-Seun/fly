import { useRouter } from 'next/router'
import React,{useEffect,useContext} from 'react'
import Layout from '../../components/Layout'
import Store from '../../utils/Store'

function Order() {
  const router = useRouter()
  const { _id } = router.query
  const {dispatch} = useContext(Store)
  


  useEffect(() => {
    dispatch({type:"DELETE_KEY", payload:"cartItemsDrones"})

  },[dispatch])
  return (
    <Layout title='Order' description='Order Details'>
      <div>{ _id}</div>
    </Layout>
  )
}

export default Order