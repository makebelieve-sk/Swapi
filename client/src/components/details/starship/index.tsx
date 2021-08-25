import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import StarshipController from '../../../controllers/starship.controller'
import Spinner from '../../spinner'
import {RootState} from '../../../types/redux.index'
import store from '../../../redux/store'
import ActionCreatorStarships from '../../../redux/starships/actions'
import ErrorIndicator from "../../error-indicator";

import './starship.scss'

export default function StarshipDetails({starshipId}: {starshipId: string}) {
    const {starship, errorStarship} = useSelector((state: RootState) => state.reducerStarships)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (starshipId) {
            StarshipController.getStarship(starshipId, setLoading)
        } else {
            store.dispatch(ActionCreatorStarships.setStarship(null))
        }
    }, [starshipId])

    if (errorStarship) {
        return <div className='flex-block'><ErrorIndicator /></div>
    }

    if (loading) {
        return <div className='flex-block'><Spinner /></div>
    }

    if (starship && starshipId) {
        return (
            <div className='details-wrapper'>
                <span className="title-adaptive">{starship.name}</span>

                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`} alt="starship" />

                <div>
                    <span className="title">{starship.name}</span>

                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="term">Model</span>
                            <span className="term">{starship.model}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Manufacturer</span>
                            <span className="term">{starship.manufacturer}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Cost in credits</span>
                            <span className="term">{starship.cost_in_credits}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Length</span>
                            <span className="term">{starship.length}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Max atmospheric speed</span>
                            <span className="term">{starship.max_atmosphering_speed}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Crew</span>
                            <span className="term">{starship.crew}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Passengers</span>
                            <span className="term">{starship.passengers}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Cargo capacity</span>
                            <span className="term">{starship.cargo_capacity}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Consumables</span>
                            <span className="term">{starship.consumables}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Hyper drive rating</span>
                            <span className="term">{starship.hyperdrive_rating}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Starship class</span>
                            <span className="term">{starship.starship_class}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return <span className='main-text'>Select starship</span>
    }
}