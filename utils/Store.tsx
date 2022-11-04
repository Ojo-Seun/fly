import React, { ContextType, Dispatch, useContext, useReducer } from 'react'
import { cartItemType, stateType, } from '../typeScriptTypes'
import Cookie from './cookies'

const initialValue:stateType = {
  cart: {
    cartItems:Cookie.getCartItems("cartItemsDrones",[])
  }
    
}
type actionType = {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "REDUCE_ITEM_QTY" | "INCREASE_ITEM_QTY",
  payload:any
}


export const Store = React.createContext({state:initialValue, dispatch:{} as Dispatch<actionType>})


type childrenProps = {
  children:React.ReactNode
}







const reducer = (state:stateType, action:actionType) => {
  switch (action.type) {
    
    case "ADD_ITEM":
            const newItem = action.payload;
            const isExist = state.cart.cartItems.find(item => item._id === newItem._id);
            const newCartItemsAdd = isExist ? state.cart.cartItems : ([...state.cart.cartItems, newItem])
      Cookie.setCartItems("cartItemsDrones", newCartItemsAdd,)
      return { ...state, cart: { cartItems: newCartItemsAdd } }
    case "REMOVE_ITEM":
      const itemToDelete = action.payload
      const newCartItemsDelete = state.cart.cartItems.filter(item => item._id !== itemToDelete._id)
      Cookie.setCartItems("cartItemsDrones", newCartItemsDelete)
      return { ...state, cart: { cartItems: newCartItemsDelete } }
    case "REDUCE_ITEM_QTY":
      const itemToReduce = action.payload
      const itemToReduceExist = state.cart.cartItems.find(item => item._id === itemToReduce._id)
      const newCartItemsReduceqty = itemToReduceExist ? (state.cart.cartItems.map(item => item._id === itemToReduce._id ? { ...item, qty: item.qty - 1 } : item)) : state.cart.cartItems
      Cookie.setCartItems("cartItemsDrones", newCartItemsReduceqty)
      return { ...state, cart: { cartItems: newCartItemsReduceqty } }
    case "INCREASE_ITEM_QTY":
      const itemToIncrease = action.payload
      const itemToIncreaseExist = state.cart.cartItems.find(item => item._id === itemToIncrease._id)
      const newCartItemsIncreaseQty = itemToIncreaseExist ? (state.cart.cartItems.map(item => item._id === itemToIncrease._id ? { ...item, qty: item.qty + 1 } : item)) : state.cart.cartItems
      Cookie.setCartItems("cartItemsDrones", newCartItemsIncreaseQty)
      return { ...state, cart: { cartItems: newCartItemsIncreaseQty } }

    default:
      return state

  }
}




export function StoreProvider({children}:childrenProps) {
  const [ state, dispatch ] = useReducer(reducer, initialValue)
  const values = {state,dispatch}
  return (
    <Store.Provider value={values}>
      {children}
    </Store.Provider>
  )
}

export default Store