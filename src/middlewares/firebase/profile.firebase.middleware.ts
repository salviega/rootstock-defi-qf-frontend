import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import { database } from '@/config/firebase'
import { Profile } from '@/models/profile.model'
import { FIREBASE_COLLECTION_PROFILES } from '@/utils/variables/constants'

export function profilesApiFirebase() {
	const profilesCollectionRef = collection(
		database,
		FIREBASE_COLLECTION_PROFILES
	)

	const addProfile = async (profile: Profile) => {
		try {
			const docRef = await addDoc(profilesCollectionRef, profile)
			console.log('Profile added with ID: ', docRef.id)
		} catch (e) {
			console.error('Error adding profile: ', e)
		}
	}

	const getProfileByAddress = async (address: string): Promise<Profile> => {
		const item = await getDocs(
			query(profilesCollectionRef, where('owner', '==', address))
		)

		if (item.docs.length === 0) {
			console.log(`No profile with ownerAddress "${address}" found`)
			// return {} as Profile
		}

		return item.docs[0].data() as Profile
	}

	return {
		addProfile,
		getProfileByAddress
	}
}
