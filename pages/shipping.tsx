import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Store from '../utils/Store'

function ShippingScreen() {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  useEffect(() => {
  const {loginInfo,cart} = state
    if (!loginInfo.Token) {
      router.replace('/login')
      return
    }

    if (cart.cartItems.length < 1) {
      router.replace('/')
    }


},[state,router])




  return (
    <div>ShippingScreen</div>
  )
}

export default ShippingScreen