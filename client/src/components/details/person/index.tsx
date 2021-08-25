import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import PersonController from '../../../controllers/person.controller'
import Spinner from '../../spinner'
import ErrorIndicator from '../../error-indicator'
import {RootState} from '../../../types/redux.index'
import store from '../../../redux/store'
import ActionCreatorPeople from '../../../redux/people/actions'

import './person.scss'

export default function PersonDetails({personId}: {personId: string}) {
    const {person, errorPerson} = useSelector((state: RootState) => state.reducerPeople)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (personId) {
            PersonController.getPerson(personId, setLoading)
        } else {
            store.dispatch(ActionCreatorPeople.setPerson(null))
        }
    }, [personId])

    if (errorPerson) {
        return <div className='flex-block'><ErrorIndicator /></div>
    }

    if (loading) {
        return <div className='flex-block'><Spinner /></div>
    }

    if (person && personId) {
        return (
            <div className='details-wrapper'>
                <span className="title-adaptive">{person.name}</span>

                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`} alt="person" />

                <div>
                    <span className="title">{person.name}</span>

                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span className="term">{person.height}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Massa</span>
                            <span className="term">{person.mass}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Hair color</span>
                            <span className="term">{person.hair_color}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Skin color</span>
                            <span className="term">{person.skin_color}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Eye color</span>
                            <span className="term">{person.eye_color}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Birth year</span>
                            <span className="term">{person.birth_year}</span>
                        </li>

                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span className="term">{person.gender}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return <span className='main-text'>Select person</span>
    }
}