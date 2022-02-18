import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document{
    render(){
        return (
        <Html lang="en">
                <Head>
                    <link 
                    rel="preload" 
                    href="/fonts/UnifrakturCook-Bold.ttf" 
                    as="font" 
                    crossOrigin="anonymous"
                    ></link>
                    <link 
                    rel="preload" 
                    href="/fonts/PressStart2P-Regular.ttf" 
                    as="font" 
                    crossOrigin="anonymous"
                    ></link>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}

export default MyDocument;