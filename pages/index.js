import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Image from 'next/image'

export default function Home() {

  const handleBannerBtnClick = () => {
    console.log("Desiring Handle Banner Button Click");
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner 
          buttonText="View stores nearby" handleOnClick={handleBannerBtnClick}
        />
        <div className={styles.heroImage}>
        <Image src="/static/omlet.jpeg" width={700} height={400}></Image>
        </div>
      </main>   
    </div>
  )
}
