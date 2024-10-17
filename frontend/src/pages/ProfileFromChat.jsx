import ProfileUser from '../components/Chat/ProfileUser'
import {useParams} from 'react-router-dom'

function ProfileFromChat() {
	const {id} = useParams()
	return (
		<ProfileUser id={id} />
	)
}

export default ProfileFromChat