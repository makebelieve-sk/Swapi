import React from 'react'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import {Planet} from '../../types/planets.types'
import PlanetController from '../../controllers/planet.controller'

import './random-planet.scss'

const UPDATE_INTERVAL = 10000

export type stateType = {
    planet: Planet,
    loading: boolean,
    error: string | Error,
}

const RandomPlanet: React.FC = () => {
    const [state, setState] = React.useState<stateType>({
        planet: null,
        loading: true,
        error: ''
    })

    let interval

    React.useEffect(() => {
        updatePlanet().then(null)
        interval = setInterval(updatePlanet, UPDATE_INTERVAL)
    }, [])

    const updatePlanet = async () => {
        const id = Math.floor(Math.random() * 17) + 2

        PlanetController.getRandomPlanet(id.toString(), setState)
    }

    const { planet, loading, error } = state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet}/> : null

    return (
        <div className="random-planet jumbotron rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

type PlanetViewType = {
    planet: Planet
}

const PlanetView: React.FC<PlanetViewType> = ({ planet }) => {
    const { id, name, population, rotation_period, diameter } = planet

    return (
        <React.Fragment>
            <span className="title-adaptive">{name}</span>

            <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet" />

            <div>
                <span className="title">{name}</span>

                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span className="term">{population}</span>
                    </li>

                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span className="term">{rotation_period}</span>
                    </li>

                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span className="term">{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default RandomPlanet