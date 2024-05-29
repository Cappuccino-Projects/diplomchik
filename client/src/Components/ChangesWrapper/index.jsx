import { ChangeCard } from '@components/ChangeCard'
import { useGetAllChangesQuery } from '@redux/services/changesApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const ChangesWrapper = () => {
	const { data: allChanges, isSuccess } = useGetAllChangesQuery()
	const { id: userId } = useSelector((state) => state.user.user)
	const [changes, setChanges] = useState([])

	useEffect(() => {
		if (isSuccess) {
			const list = allChanges.filter((item) => item.userId === userId)
			setChanges(list)
		}
	}, [allChanges])

	return (
		<div style={{ marginBottom: '30px' }} className={styles.CardsWrapper}>
			{changes?.map((item) => (
				<ChangeCard key={item.id} item={item} />
			))}
		</div>
	)
}
