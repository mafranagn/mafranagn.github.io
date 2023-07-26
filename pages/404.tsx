import Layout from '../components/layout'
import Head from 'next/head';

export default function Custom404() {
    return (
        <Layout>
          <Head>
            <title>404</title>
          </Head>
          <h1 style={{textAlign:'center'}}>Page Not Found <br/> 😔</h1>
        </Layout>
    );
}