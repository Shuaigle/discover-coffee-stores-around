import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <footer>
        <p 
        style={{ position: "relative", left: "50%", bottom: 0, width: "100%" }}
        >2022 Shuaigle 
        </p>
      </footer>
    </div>
  )
}

export default MyApp;
