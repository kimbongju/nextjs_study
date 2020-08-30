import Layout from '../../components/fruit-store/Layout'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Filter, Fruit } from './list';
import FruitCard, { CardType } from '../../components/fruit-store/FruitCard';
import { fruitActions } from '../../store/fruitReducer';

function Cart() {

    const dispatch = useDispatch();

    const { fruits, cart } = useSelector((state: RootState) => state.fruit);

    const cartList = (filter: Filter): Fruit[] => {
        const cartList: Fruit[] = [];
        cart.forEach(cartItem => {
            const target = fruits.find(fruit => fruit.id === cartItem.id);
            if (target) {
                cartList.push(target);
            }
        })

        switch (filter) {
            case Filter.Normal:
                return cartList.filter(fruit => !fruit.isPrime);
            case Filter.PRIME:
                return cartList.filter(fruit => fruit.isPrime);
            case Filter.All:
            default:
                return cartList;
        }
    };

    const filterPrice = (filter: Filter) => {
        return cartList(filter).reduce((prev, curr) => {
            let count = 1;
            const findCart = cart.find(cartItem => cartItem.id === curr.id);
            if (findCart) {
                count = findCart.count;
            }
            return prev + (curr.price * count);
        }, 0);
    }

    return (
        <Layout>
            <CartBlock>
                {
                    cartList(Filter.All).length === 0 ?
                        <EmptyBlock>
                            담긴 상품이 없어요 <span role="img" aria-label="oops">😵</span>
                        </EmptyBlock> :
                        <>
                            <ListBlock>
                                {
                                    cartList(Filter.All).map((fruit, fruitIndex) => {
                                        return <FruitCard
                                            key={fruitIndex}
                                            {...fruit}
                                            type={CardType.CART}
                                        />
                                    })
                                }
                            </ListBlock>
                            <AmountBlock>
                                <PriceWrapper>prime 과일 : {filterPrice(Filter.PRIME)} 원</PriceWrapper>
                                <PriceWrapper>일반 과일 : {filterPrice(Filter.Normal)} 원</PriceWrapper>
                                <PriceWrapper>총 상품 금액 : {filterPrice(Filter.All)}</PriceWrapper>
                                <PurchaseButton
                                    onClick={() => dispatch(fruitActions.resetCart())}
                                >결제하기</PurchaseButton>
                            </AmountBlock>
                        </>
                }
            </CartBlock>
        </Layout>
    )
}

const CartBlock = styled.div`
    background-color: #E5E5E5;
    padding: 60px 0px;
    min-height: 100vh;
`

const ListBlock = styled.section`
    display: flex;
    flex-wrap: wrap;
    width: 952px;
    margin: auto;
`

const EmptyBlock = styled.section`
    text-align: center;
    font-size: 16px;
    font-weight: 700;
`

const AmountBlock = styled.section`
    width: 924px;
    margin: 20px auto 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const PriceWrapper = styled.div`

`

const PurchaseButton = styled.button`
    padding: 12px 16px;
    border-radius: 8px;
    margin-left: 12px;
    background-color: #FFD400;
`

export default Cart;
