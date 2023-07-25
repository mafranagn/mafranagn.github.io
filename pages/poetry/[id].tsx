import Layout from '../../components/layout'
import { getAllPoetryIds, getPoetryData } from '../../lib/poetry'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Publication({
  poetryData
}: {
  poetryData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{poetryData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{poetryData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={poetryData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: poetryData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPoetryIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const poetryData = await getPoetryData(params?.id as string)
  return {
    props: {
      poetryData
    }
  }
}