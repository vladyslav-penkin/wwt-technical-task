import { useEffect, useState } from 'react'

export const useResize = () => {
	const [isSmall, setIsSmall] = useState<boolean>(window.innerWidth >= 768)

	useEffect(() => {
		const handleResize = () => {
			setIsSmall(window.innerWidth >= 768 ? true : false)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return isSmall
}
