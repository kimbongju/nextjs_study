import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>안녕하세요 :)</p>
        <p>
          주디입니다. 저는 웹 프론트 개발자 입니다.
        </p>
      </section>
    </Layout>
  )
}