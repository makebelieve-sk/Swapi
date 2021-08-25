import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter, RouteComponentProps } from 'react-router-dom';

import ItemList from '../../components/item-list'
import PersonDetails from '../../components/details/person'
import PersonController from '../../controllers/person.controller'
import {RootState} from '../../types/redux.index'

import './people.scss'

// Типы для дженерика RouteComponentProps<Params, C, S>
interface ParamsProps {
    id: string
}

interface PeoplePageProps extends RouteComponentProps<ParamsProps> {
}

const PeoplePage: React.FunctionComponent<PeoplePageProps> = ({history, match}) => {
    const people = useSelector((state: RootState) => state.reducerPeople.people)

    const {id} = match.params;

    // Загружаем все записи персонажей
    function getPeople(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
        PersonController.getAll(setLoading)
    }

    return (
        <div className='people-wrapper'>
            <div className='people-wrapper-list'>
                <ItemList data={people} getData={getPeople} onItemSelected={(id: number) => history.push('/people/' + id)} />
            </div>

            <div className='people-wrapper-details'>
                <PersonDetails personId={id} />
            </div>
        </div>
    )
}

export default withRouter(PeoplePage)