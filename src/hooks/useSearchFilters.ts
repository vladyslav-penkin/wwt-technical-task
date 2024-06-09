import { useState } from 'react'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

export const useSearchFilters = () => {
	const [searchFilters, setSearchFilters] = useState<SearchRequestFilter>([])

	const handleApplyFilters = (newFilters: SearchRequestFilter) => {
		setSearchFilters(newFilters)
	}

	return { searchFilters, handleApplyFilters }
}
