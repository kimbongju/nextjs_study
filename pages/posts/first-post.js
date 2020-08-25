import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/posts">
                    <a>Back to home</a>
                </Link>

                {/* <Link href="/">
            <a className="foo" target="_blank" rel="noopener noreferrer">
                Hello World
            </a>
        </Link> */}
                {/* https://github.com/vercel/next-learn-starter/blob/master/snippets/link-classname-example.js */}
            </h2>
        </Layout>
    )
}