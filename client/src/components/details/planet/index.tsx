import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import PlanetController from '../../../controllers/planet.controller'
import Spinner from '../../spinner'
import {RootState} from '../../../types/redux.index'
import store from '../../../redux/store'
import ActionCreatorPlanets from '../../../redux/planets/actions'

import './planet.scss'
import ErrorIndicator from "../../error-indicator";

export default function PlanetDetails({planetId}: {planetId: string}) {
    const {planet, errorPlanet} = useSelector((state: RootState) => state.reducerPlanets)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (planetId) {
            PlanetController.getPlanet(planetId, setLoading)
        } else {
            store.dispatch(ActionCreatorPlanets.setPlanet(null))
        }
    }, [planetId])

    if (errorPlanet) {
        return <div className='flex-block'><ErrorIndicator /></div>
    }

    if (loading) {
        return <div className='flex-block'><Spinner /></div>
    }

    if (planet && planetId) {
        return (
            <div className='details-wrapper'>
                <span className="title-adaptive">{planet.name}</span>

                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`} alt="planet" />

                <div>
                    <span className="title">{planet.name}</span>

                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="term">Rotation period</span>
                            <span className="term">{planet.rotation_period}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Orbital period</span>
                            <span className="term">{planet.orbital_period}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span className="term">{planet.diameter}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Climate</span>
                            <span className="term">{planet.climate}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Gravity</span>
                            <span className="term">{planet.gravity}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Terrain</span>
                            <span className="term">{planet.terrain}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Surface water</span>
                            <span className="term">{planet.surface_water}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return <span className='main-text'>Select planet</span>
    }
}