import { FC } from 'react'

import { Box, Text } from '@chakra-ui/react'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { useResize } from '@/hooks/useResize'
import { FilterCheckbox } from '@components/FilterCheckbox'

import { FilterItem as FilterItemType } from '../../types/FilterItem'

interface Props {
	filter: FilterItemType
	selectedFilters: SearchRequestFilter
	isHasBorder: boolean
	handleOptionsChange: (filterId: string, optionId: string) => void
}

export const FilterItem: FC<Props> = ({
	filter,
	selectedFilters,
	isHasBorder,
	handleOptionsChange
}) => {
	const isTablet = useResize()
	return (
		<Box
			display="flex"
			flexDir="column"
			gap={4}
			key={filter.id}
		>
			<Text
				fontSize="xl"
				paddingY={5}
				borderTopWidth={isHasBorder ? 1 : 0}
				borderStyle="solid"
			>
				{filter.name}
			</Text>
			<Box
				display="grid"
				gridTemplateColumns={isTablet ? 'repeat(3, 1fr)' : '1fr'}
				gap={4}
				mb={5}
			>
				{filter.options.map(option => {
					const isChecked = selectedFilters
						.find(item => item.id === filter.id)
						?.optionsIds.includes(option.id)

					return (
						<FilterCheckbox
							key={option.id}
							name={option.name}
							isChecked={Boolean(isChecked)}
							onChange={() => handleOptionsChange(filter.id, option.id)}
						/>
					)
				})}
			</Box>
		</Box>
	)
}
