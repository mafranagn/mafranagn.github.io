import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPoetryData } from '../lib/poetry'
import { GetStaticProps } from 'next'
import Poem from '../components/poem'

export default function Home({
  allPoetryData
}: {
  allPoetryData: {
    date: string
    title: string
    id: string
    snippet: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.sectionPadding}>
        {allPoetryData.map(({ id, date, title, snippet }) => (
          <Poem key={id} content={{ id, date, title, snippet }} />
        ))}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPoetryData = await getSortedPoetryData()
  return {
    props: {
      allPoetryData
    }
  }
}