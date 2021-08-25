import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom';

import ItemList from '../../components/item-list'
import PlanetDetails from '../../components/details/planet'
import PlanetController from '../../controllers/planet.controller'
import {RootState} from '../../types/redux.index'

import './planets.scss'

const PlanetsPage = ({history, match}: {history: any, match: any}) => {
    const planets = useSelector((state: RootState) => state.reducerPlanets.planets)

    const {id} = match.params;

    // Загружаем все записи раздела
    function getPlanets(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
        PlanetController.getAll(setLoading)
    }

    return (
        <div className='people-wrapper'>
            <div className='people-wrapper-list'>
                <ItemList data={planets} getData={getPlanets} onItemSelected={(id: number) => history.push('/planets/' + id)} />
            </div>

            <div className='people-wrapper-details'>
                <PlanetDetails planetId={id} />
            </div>
        </div>
    )
}

export default withRouter(PlanetsPage)