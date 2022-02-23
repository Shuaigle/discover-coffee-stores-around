import { useRouter } from 'next/router';
import Link from 'next/link';

import coffeeStoresData from '../../data/coffee-stores.json'

export function getStaticProps(staticProps) {
    const params = staticProps.params
    return {
        props: {
            coffeeStore: coffeeStoresData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id;
            })
        }
    }
    
}

export function getStaticPaths({params}) {
    return {
        paths: [
            { params: {id: "0" } },
            { params: {id: "1" } }
        ],
        fallback: false
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    return (
    <div>
        Welcome To Coffee Store Page {router.query.id}
        <br />
        <br />
        <Link href="/"><a>Back to home</a></Link>
        <br />
        <br />
        <Link href="/coffee-store/page"><a>Go to a page</a></Link>
        <p>{props.coffeeStore.address}</p>
        <p>{props.coffeeStore.name}</p>
    </div>
        );
};

export default CoffeeStore;