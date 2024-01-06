import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ModalProvider } from "@/context/ModalContext";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

function MyApp({ Component, pageProps, ...appProps }: any) {
  const isLayoutExcluded = [`book-now`,`booking-confirmation`,'book-now-oct-offer','book-now-oct-offer-int'].includes(
    appProps.router.pathname.split("/")[1]
  );
  // console.log(appProps.router.pathname.split("/"),"appProps.router.pathname");
  const LayoutComponent = isLayoutExcluded ? React.Fragment : Layout;
  return (
    <>
      <Head>
        <title>Xcool</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        ></link>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon"></link>
        <meta name="facebook-domain-verification" content="ldgz5d4rau506mxezyoryjhmz8zu96" />
      </Head>
      <Script
        id="load-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-tag-manager">
        {`
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-PZC36C5D")
        `}
      </Script>

      <Script strategy="lazyOnload" id="analytics-config">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Script strategy="lazyOnload" id="meta-pixel">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1348526759319159');
          fbq('track', 'PageView');
        `}
      </Script>
     


      <ModalProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ModalProvider>
      
    </>
  );
}

export default MyApp;
