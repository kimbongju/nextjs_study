import Layout from '../../components/fruit-store/Layout'
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled'
import { css } from '@emotion/core';

import { RootState } from '../../store/rootReducer';
import { fruitActions } from '../../store/fruitReducer';

import FruitCard, { CardType } from '../../components/fruit-store/FruitCard';

import { useRouter } from 'next/router';
import fetch from 'node-fetch';

export interface Fruit {
    id: number,
    name: string,
    image: string,
    stock: number,
    price: number,
    isPrime: boolean
}

export enum Filter {
    all,
    normal,
    prime,
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/data/fruit.json');
    const fruitList = await response.json();
    return {
        props: {
            fruitList
        }, // will be passed to the page component as props
    }
}

function List({ fruitList }) {
    const router = useRouter();

    // router가 변경됨을 감지해서 filter를 set 한다
    const getFilterQuery = useEffect(() => {
        const filterParam = router.query.filter;
        if (typeof filterParam === 'string') {
            setFilterType(Filter[filterParam]);
        } else {
            setFilterType(Filter.all);
        }
    }, [router]);

    // useState 값 enum은 초기화를 하지 않을때만 대입해주면 된다(대입하는 시점에서 타입을 알수 있기 때문에)
    const [filterType, setFilterType] = useState<Filter>(Filter.all);
    const { fruits } = useSelector((state: RootState) => state.fruit);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadFruitList() {
            // const response = await fetch('/data/fruit.json');
            // const fruitList = await response.json();
            dispatch(fruitActions.setList(fruitList));
        }
        loadFruitList();
    }, []);

    // TODO: 공통으로 쓸수 있도록 변경하면 좋을듯...
    const filterList = () => {
        switch (filterType) {
            case Filter.normal:
                return fruits.filter(fruit => !fruit.isPrime);
            case Filter.prime:
                return fruits.filter(fruit => fruit.isPrime);
            case Filter.all:
            default:
                return fruits;
        }
    };

    const handleClickFilter = (paramFilterType: Filter) => {
        router.push(`/fruit-store/list?filter=${Filter[paramFilterType]}`);
    }

    const isActive = (paramFilterType: Filter) => {
        return filterType === paramFilterType;
    }

    return (
        <Layout>
            <FilterBlock>
                <FilterButton
                    onClick={() => handleClickFilter(Filter.all)}
                    active={isActive(Filter.all)}
                >전체</FilterButton>
                <FilterButton
                    onClick={() => handleClickFilter(Filter.normal)}
                    active={isActive(Filter.normal)}
                >일반 과일</FilterButton>
                <FilterButton
                    onClick={() => handleClickFilter(Filter.prime)}
                    active={isActive(Filter.prime)}
                >Prime 과일</FilterButton>
            </FilterBlock>
            <MenuBlock>
                <ListBlock>
                    {
                        filterList().map((fruit, fruitIndex) => {
                            return <FruitCard
                                key={fruitIndex}
                                {...fruit}
                                type={CardType.LIST}
                            />
                        })
                    }
                </ListBlock>
            </MenuBlock>
        </Layout>
    )
}

const MenuBlock = styled.div`
    background-color: #E5E5E5;
    padding-bottom: 60px;
`

const FilterBlock = styled.section`
    display: flex;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #E5E5E5;
`

const FilterButton = styled.button<{ active: boolean }>`
    padding: 12px 16px;
    border-radius: 8px;
    margin-left: 12px;
    ${props => props.active && css`
        background-color: #FFD400;
    `}
`

const ListBlock = styled.section`
    display: flex;
    flex-wrap: wrap;
`

export default List