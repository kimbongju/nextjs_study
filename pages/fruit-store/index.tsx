import Link from 'next/link'
import Layout from '../../components/fruit-store/Layout'
import styled from '@emotion/styled'

function Index() {
    return (
        <Layout home>
            <IndexBlock>
                <WelcomeBlock>
                    안녕하세요 👋<br />크몽이네 과일가게 입니다 🍎
                </WelcomeBlock>
            </IndexBlock>
        </Layout>
    )
}

const IndexBlock = styled.div`
    background-color: #E5E5E5;
    padding: 60px 0px;
    min-height: 100vh;
`

const WelcomeBlock = styled.section`
    text-align: center;
    font-size: 16px;
    font-weight: 700;
`

export default Index