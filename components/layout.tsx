import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useInView } from "framer-motion"
import { useRef } from 'react'

export const siteTitle = 'Francesca Agnes'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Francesca's personal website"
          />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <h1 ref={ref} style= {{
                  opacity: isInView ? 1 : 0, 
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
                className={utilStyles.heading2Xl}>{siteTitle}</h1>
            </>
          ) : (
            <>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {siteTitle}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}