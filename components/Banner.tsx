import React, { useEffect } from 'react'
import styles from '../styles/Layout.module.css'
import NextLink from 'next/link'
import Hearder from './Hearder'

function Banner() {


    useEffect(() => {
  
    const banner = document.getElementById("banner") as HTMLDivElement
    banner.style.height = "50vh"

},[])
  return (
      <>
          <Hearder/>
        <div className={styles.bannerText}>Have Eyes Everywhere</div>
      </>
  )
}

export default Banner