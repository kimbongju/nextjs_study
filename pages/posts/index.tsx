import Link from 'next/link'
import Layout from '../../components/Layout'

export default function FirstPost() {
    return (
        <Layout>
            Read <Link href="/posts/first-post"><a>this page!</a></Link>
        </Layout>
    )
}