import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ListCartItems from '../components/ListCartItems'
import { cartItemType, productInitialValues } from '../typeScriptTypes'
import Store from '../utils/Store'
import styles from '../styles/Cart.module.css'
import ShowError from '../components/ShowError'
import dynamic from 'next/dynamic'
import Button from '../components/Button'

function Cart() {
    const { state, dispatch } = useContext(Store)
    const { cartItems } = state.cart
    
    const subTotal = () => {
        return cartItems.reduce((a,c)=>a + c.price * c.qty,0)
    }

    const handleClick = () => {
        
    }

    return (
        <Layout title='Shopping Cart' description='Shopping Cart Page'>
            
            <div className={styles.cartPage}>
                {
                    cartItems.length > 0 ? <div className={styles.cart}>
                        <div className={styles.shoppingCart}>
                            <h3>Shopping Cart</h3>
                            <ListCartItems cartItems={cartItems}/>
                        </div>
                        <div></div>
                        <div className={styles.cartSummary}>
                            <h3>Summary</h3>
                            <div className={styles.summaryDetails}>
                                <div><h5>SubTotal:{' '}</h5><h5 style={{ color: "red" }}>${subTotal().toFixed(2)}</h5></div>
                                <div><h5>Shipping:{' '}</h5><h5 style={{ color: "red" }}>${(subTotal() / 90).toFixed(2)}</h5></div><hr />
                                <div><h4>Total:{' '}</h4><h4 style={{ color: "red" }}>${((subTotal() / 90) + subTotal()).toFixed(2)}</h4></div><hr />
                                <div className={styles.purchaseBtn}><Button text='Purchase' length='fw' handleClick={handleClick}/></div>
                                
                            </div>
                        </div>
                    </div>: <ShowError><span>Your Cart Is Empty, <Link href='/'><a style={{color:"blue"}}>Go Shopping...</a></Link> </span></ShowError>
                }
            </div>
      </Layout>
  )
}

export default dynamic(()=>Promise.resolve(Cart),{ssr:false})