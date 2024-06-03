import {
	BackToMapEditMenu,
	SuggestionsWrapper
} from '@components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChanges } from '../../app/redux/slices/changesSlice'
import styles from './styles.module.css'

export const UserSuggestions = () => {
	const userSuggestions = useSelector((state) => state.places.userSuggestions)
	//console.log('User Suggestions:', userSuggestions)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setChanges())
	}, [dispatch])

	return (
		<>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMapEditMenu />
			</div>
			<p className={styles.TitleText}>Предложения</p>
			<SuggestionsWrapper locations={userSuggestions} />
		</>
	)
}
