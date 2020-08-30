import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { Fruit } from '../../pages/fruit-store/list'
import { css } from '@emotion/core'

import { fruitActions } from '../../store/fruitReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export enum CardType {
    LIST,
    CART,
}

export interface Card extends Fruit {
    type: CardType
};

function FruitCard({
    id,
    name,
    image = '',
    stock,
    price,
    isPrime,
    type,
}: Card) {

    const dispatch = useDispatch();

    const { cart } = useSelector((state: RootState) => state.fruit);

    const targetCart = useMemo(() => {
        const target = cart.find(fruit => fruit.id === id);
        if (!target) {
            return {
                id: -1,
                count: 0,
            };
        }
        return target;
    }, [cart, id])

    const quantityStock = () => {
        return stock - targetCart.count;
    };

    const amount = () => {
        return price * targetCart.count;
    }

    return (
        <CardBlock>
            {isPrime && <PrimeLogo>prime</PrimeLogo>}
            <InfoWrapper>
                <EmojiBlock>{image}</EmojiBlock>
                <InfoBlock>
                    <Title>{name}</Title>
                    <Price>{price}원</Price>
                    {type === CardType.LIST &&
                        <CountWrapper>
                            <CountLabel>잔량</CountLabel>
                            <Count>{quantityStock()}</Count>
                        </CountWrapper>
                    }
                    <CountWrapper>
                        <CountLabel>수량</CountLabel>
                        <Count>{targetCart.count}</Count>
                    </CountWrapper>
                    {type === CardType.CART &&
                        <CountWrapper
                            showDivider={true}
                        >
                            <CountLabel>상품금액</CountLabel>
                            <Count>{amount()}</Count>
                        </CountWrapper>
                    }
                </InfoBlock>
            </InfoWrapper>
            <ButtonBlock>
                {type === CardType.LIST &&
                    <>
                        <MinusButton
                            onClick={() => dispatch(fruitActions.minusCart(id))}
                        >빼기</MinusButton>
                        <AddButton
                            isPrime={isPrime}
                            onClick={() => dispatch(fruitActions.addCart(id))}
                            disabled={quantityStock() < 1}
                        >담기</AddButton>
                    </>
                }
                {type === CardType.CART &&
                    <MinusButton
                        onClick={() => dispatch(fruitActions.cancelCart(id))}
                    >취소</MinusButton>
                }
            </ButtonBlock>
        </CardBlock>
    )
}

const CardBlock = styled.article`
    padding: 40px 20px 20px 20px;
    border-radius: 12px;
    background-color: #fff;
    width: 416px;
    margin: 12px 0 0 12px;
    position: relative;
`

const PrimeLogo = styled.i`
    position: absolute;
    top: 8px;
    left: 12px;
    font-weight: 700;
    color: #FB842D;
`

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const EmojiBlock = styled.span`
    font-size: 80px;
    padding: 0 20px 0 40px;
`

const InfoBlock = styled.div`
    flex: 1;
    margin-left: 20px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const Price = styled.div`
    font-weight: 500;
    margin-top: 12px;
`

const CountWrapper = styled.div <{ showDivider?: boolean }> `
    display: flex;
    align-items: center;
    margin-top: 8px;
    ${props => props.showDivider && css`
        padding-top: 8px;
        border-top: 1px solid #C8CAD2;
    `}
`

const CountLabel = styled.span`
    color: #727585;
`

const Count = styled.span`
    margin-left: 10px;
`

const ButtonBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
`

const MinusButton = styled.button`
    padding: 12px 16px;
    border-radius: 8px;
    margin-left: 12px;
`

const AddButton = styled.button<Pick<Fruit, 'isPrime'>>`
    padding: 12px 16px;
    border-radius: 8px;
    margin-left: 12px;
    background-color: #FFD400;
    ${props => props.isPrime && css`
        background-color: #FB842D;
    `}
`

export default FruitCard
