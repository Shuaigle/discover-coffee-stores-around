import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames'

import coffeeStoresData from '../../data/coffee-stores.json'
import styles from '../../styles/coffee-store.module.css'
import { fetchCoffeeStores } from '../../lib/coffee-stores'

export async function getStaticProps(staticProps) {
    const params = staticProps.params
    const coffeeStores = await fetchCoffeeStores()
    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id;
            })
        }
    }

}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            }
        }
    })
    return {
        paths,
        fallback: true,
    }
}

const CoffeeStore = (props) => {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const {address, neighbourhood, name, imgUrl} = props.coffeeStore
    const hangleUpvoteButton = () => {
        console.log("handle upvote")
    }
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            Welcome To Coffee Store Page {router.query.id}
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                        width={600}
                        height={360}
                        className={styles.storeImg}
                        alt={name}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/icons/places.svg" 
                            width={24}
                            height={24}
                            alt="places icon"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    {neighbourhood && (
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/icons/nearMe.svg" 
                            width={24} 
                            height={24}
                            alt="near me icon"
                        />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/icons/stars.svg" 
                            width={24} 
                            height={24}
                            alt="stars icon"
                        />
                        <p className={styles.text}>1</p>
                    </div>

                    <button 
                    className={styles.upvoteButton} 
                    onClick={hangleUpvoteButton}
                    >Up Vote</button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStore