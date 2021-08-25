import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import {StateType} from '../../types/redux.index'
import {Planets} from '../../types/planets.types'
import {People} from '../../types/people.types'
import {Starships} from '../../types/starships.types'

import './item-list.scss'

export default function ItemList({data, getData, onItemSelected}: {data: People | Planets | Starships, getData: (setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => void, onItemSelected: (id: number) => void}) {
    const {errorPeople, errorPlanets, errorStarships} = useSelector((state: StateType) => ({
        errorPeople: state.reducerPeople.errorPeople,
        errorPlanets: state.reducerPlanets.errorPlanets,
        errorStarships: state.reducerStarships.errorStarships,
    }))

    const [loading, setLoading] = useState<boolean>(false)

    // Загружаем все записи персонажей
    useEffect(() => {
        getData(setLoading)
    }, [])

    if (errorPeople || errorPlanets || errorStarships) {
        return <div className='flex-block'><ErrorIndicator /></div>
    }

    if (loading) {
        return <div className='flex-block'><Spinner /></div>
    }

    return <ul className='item-list'>
        {
            data && data.length
                ? data.map(item => <li key={item.id} className='list-group-item' onClick={() => onItemSelected(item.id)}>{item.name}</li>)
                : <span className='main-text'>Увы, записей нет :(</span>
        }
    </ul>
}