import React from 'react'

import GlassText from '@/component/glassText'
import SearchBar from '@/component/searchBar'

import styles from './landing.module.scss'

export default function Home() {
	return (
		<main className={styles.landing}>
			<GlassText />
		</main>
	)
}
