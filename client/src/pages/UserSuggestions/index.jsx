import {
    BackToMapEditMenu,
    MinimizeMenuButton,
    SuggestionsWrapper,
} from '@components'
import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setChanges } from '../../app/redux/slices/changesSlice'
import { useEffect } from 'react';

export const UserSuggestions = () => {
  const removedPlaces = useSelector((state) => state.removedPlaces);
    console.log('Removed Places:', removedPlaces);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChanges());
    }, [dispatch]);

    return (
        <div className={styles.MenuWrapper}>
            <div className={styles.MenuTopButtonsWrapper}>
                <BackToMapEditMenu />
                <MinimizeMenuButton />
            </div>
            <p className={styles.TitleText}>Предложения</p>
            <SuggestionsWrapper locations={removedPlaces} />
        </div>
    )
}