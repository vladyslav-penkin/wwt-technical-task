import { FC, useEffect, useState } from 'react'

import { Box, Center, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { BasicButton } from '@components/BasicButton'
import { BasicCard } from '@components/BasicCard'

import { FilterModal } from '../../components/FilterModal'
import { FilterItem } from '../../types/FilterItem'

interface FilterRequestResponse {
	filterItems: FilterItem[]
}

const fetchFilters = async (): Promise<FilterRequestResponse> => {
	const response = await fetch('/dist/temp/filterData.json')
	return response.json()
}

export const App: FC = () => {
	const [isModalOpen, setModalOpen] = useState(false)
	const [selectedFilters, setSelectedFilters] = useState<SearchRequestFilter>(
		[]
	)
	const [tempSelectedFilters, setTempSelectedFilters] =
		useState<SearchRequestFilter>([])
	const { data, isLoading, error } = useQuery<FilterRequestResponse>({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})

	const handleApply = (newFilters: SearchRequestFilter) => {
		setTempSelectedFilters(newFilters)
		setSelectedFilters(newFilters)
		setModalOpen(false)
	}

	useEffect(() => {
		if (data?.filterItems) {
			const initialFilters = data.filterItems.map(filter => ({
				id: filter.id,
				optionsIds: []
			}))
			setTempSelectedFilters(initialFilters as unknown as SearchRequestFilter)
		}
	}, [data])

	if (isLoading) {
		return <Text>{'Loading...'}</Text>
	}
	if (error) {
		return <Text>{'Error loading filters'}</Text>
	}

	return (
		<Center
			display="flex"
			flexDir="column"
			p="60px"
			gap={4}
		>
			<BasicButton
				title="Open Filter"
				width="184px"
				height="64px"
				fontSize="sm"
				onClick={() => setModalOpen(true)}
				variant="solid"
				colorScheme="brand"
			/>
			{data?.filterItems.length && (
				<FilterModal
					data={data.filterItems}
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					onApply={handleApply}
					initialFilters={tempSelectedFilters}
				/>
			)}
			<Box
				display="flex"
				flexDir="column"
				alignItems="flex-start"
				gap={2}
			>
				{selectedFilters.map(({ id, optionsIds }) => (
					<BasicCard
						key={id}
						id={id}
						optionsIds={optionsIds}
					/>
				))}
			</Box>
		</Center>
	)
}

export default App
