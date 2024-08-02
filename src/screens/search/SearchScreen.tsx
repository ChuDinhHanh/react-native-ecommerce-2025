import React from 'react'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SearchBarComponent from './component/searchBar/SearchBarComponent'
import { Colors } from '../../constants/Colors'

const SearchScreen = () => {
  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
    >
      <SessionComponent>
        <SearchBarComponent />
      </SessionComponent>
    </ContainerComponent>
  )
}

export default SearchScreen