import {
	BackToMapEditMenu,
	MinimizeMenuButton,
	LocationsWrapper,
	// UserCard
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { setChanges } from '../../app/redux/slices/changesSlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';




export const UserSuggestions = (props) => {
	const { locations } = props

  const changes = useSelector((state) => state.changes);
	console.log('Changes:', changes);

	const dispatch = useDispatch();

	useEffect(() => {
		const myChanges =
		dispatch(setChanges());
	}, [dispatch]);


	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMapEditMenu />
				<MinimizeMenuButton />
			</div>
			<p className={styles.TitleText}>ИзбранноеПредложения</p>
			<LocationsWrapper locations={locations} />
			{/* <UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} /> */}
		</div>
	)
}
