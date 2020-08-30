import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer';

export const siteTitle = '크몽이네 과일가게'

interface Layouts {
  children: JSX.Element | React.ReactNode;
  home?: boolean;
}
function Layout({ children, home }: Layouts) {

  const { cart } = useSelector((state: RootState) => state.fruit);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HeaderBlock>
        <Link href="/fruit-store">
          <HeaderTitle>크몽이네 과일가게</HeaderTitle>
        </Link>
        <LinkBlock>
          <Link href="/fruit-store/list">
            <MenuLink>
              상품목록
            </MenuLink>
          </Link>
          <Link href="/fruit-store/cart">
            <MenuLink>
              장바구니
                {
                cart.length > 0 &&
                <CartBadge>{cart.length}</CartBadge>
              }
            </MenuLink>
          </Link>
        </LinkBlock>
      </HeaderBlock >
      <main>{children}</main>
    </>
  )
}

const HeaderBlock = styled.header`
    height: 64px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const HeaderTitle = styled.a`
    font-size: 20px;
    font-weight: 700;
    color: #333;
`

const LinkBlock = styled.div`
    position: absolute;
    right: 0;
`

const MenuLink = styled.a`
    padding: 12px 16px;
    font-weight: 700;
    border-radius: 8px;
    margin-right: 12px;
    text-decoration: none;
    background-color: #F2F3F7;
    position: relative;
    color: #333;
`

const CartBadge = styled.div`
    position: absolute;
    right: -12px;
    top: -12px;
    background-color: #FFD400;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Layout