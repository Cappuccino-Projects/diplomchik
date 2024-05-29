import { SuggestionCard } from '@components/SuggestionCard'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const SuggestionsWrapper = () => {
    const removedPlaces = useSelector((state) => state.places.userSuggestions)
    const [currentList, setCurrentList] = useState(removedPlaces)

    useEffect(() => {
        setCurrentList(removedPlaces)
    }, [removedPlaces])

    return (
        <div className={styles.CardsWrapper}>
            {currentList.map((item) => (
                <SuggestionCard key={item.id} item={item} />
            ))}
        </div>
    )
}
