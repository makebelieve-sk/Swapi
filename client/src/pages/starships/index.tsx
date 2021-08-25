import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom';

import ItemList from '../../components/item-list'
import StarshipController from '../../controllers/starship.controller'
import {RootState} from '../../types/redux.index'

import './starships.scss'

const StarshipsPage = ({history}: {history: any}) => {
    const starships = useSelector((state: RootState) => state.reducerStarships.starships)

    // Загружаем все записи персонажей
    function getStarships(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
        StarshipController.getAll(setLoading)
    }

    return (
        <div className='starships-wrapper'>
            <ItemList data={starships} getData={getStarships} onItemSelected={(id: number) => history.push('/starships/' + id)} />
        </div>
    )
}

export default withRouter(StarshipsPage)