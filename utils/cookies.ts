import Cookies from 'js-cookie'
  
class Cookie{
  static   setCartItems = (name: string, value: any) => {
       Cookies.set(name,JSON.stringify(value))
    
  }
  
   static  getCartItems = (name: string, defaultValue: any) => {
     const cartItems = Cookies.get(name) ? JSON.parse(Cookies.get(name)!) : defaultValue
    
    return cartItems
  }
  }
    


 




export default Cookie