import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    console.log('router', router)
    return (
    <div>
        Welcome To Coffee Store Page {router.query.id}
        <br />
        <br />
        <Link href="/"><a>Back to home</a></Link>
        <br />
        <br />
        <Link href="/coffee-store/page"><a>Go to a page</a></Link>
    </div>
        );
};

export default CoffeeStore;