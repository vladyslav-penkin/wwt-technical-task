import { FC, useEffect, useState } from 'react'

import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { useResize } from '@/hooks/useResize'
import { AlertModal } from '@components/AlertModal'
import { BasicButton } from '@components/BasicButton'
import { BasicText } from '@components/BasicText'
import { FilterItem } from '@components/FilterItem'

import { FilterItem as FilterItemType } from '../../types/FilterItem'

interface Props {
	data: FilterItemType[]
	isOpen: boolean
	onClose: () => void
	onApply: (selectedFilters: SearchRequestFilter) => void
	initialFilters: SearchRequestFilter
}

export const FilterModal: FC<Props> = ({
	data,
	isOpen,
	onClose,
	onApply,
	initialFilters
}) => {
	const [selectedFilters, setSelectedFilters] =
		useState<SearchRequestFilter>(initialFilters)
	const [showAlertModal, setShowAlertModal] = useState(false)
	const isTablet = useResize()

	useEffect(() => {
		setSelectedFilters(initialFilters)
	}, [initialFilters, isOpen])

	const handleOptionsChange = (filterId: string, optionId: string) => {
		setSelectedFilters(prev =>
			prev.map(filter => {
				if (filter.id === filterId) {
					const isSelected = filter.optionsIds.includes(optionId)
					return {
						...filter,
						optionsIds: isSelected
							? filter.optionsIds.filter(option => option !== optionId)
							: [...filter.optionsIds, optionId]
					}
				}
				return filter
			})
		)
	}

	const handleClearAll = () => {
		setSelectedFilters(
			initialFilters.map(filter => ({
				...filter,
				optionsIds: []
			}))
		)
	}

	const handleApplyNewFilter = () => {
		onApply(selectedFilters)
		setShowAlertModal(false)
	}

	const handleUseOldFilter = () => {
		setSelectedFilters(initialFilters)
		setShowAlertModal(false)
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent
					minW="100%"
					p={isTablet ? '60px' : '60px 20px'}
				>
					<ModalHeader>{'Filter'}</ModalHeader>
					<ModalCloseButton
						size="24px"
						p="20px"
					/>
					<ModalBody>
						{data.map((filter, index) => (
							<FilterItem
								key={filter.id}
								filter={filter}
								selectedFilters={selectedFilters}
								isHasBorder={index > 0}
								handleOptionsChange={handleOptionsChange}
							/>
						))}
					</ModalBody>
					<ModalFooter
						display="flex"
						flexDir={isTablet ? 'row' : 'column'}
						justifyContent="space-between"
						gap={4}
					>
						<Box w={114}></Box>
						<BasicButton
							title="Apply"
							width="184px"
							height="64px"
							fontSize="sm"
							isDisabled={
								JSON.stringify(selectedFilters) ===
								JSON.stringify(initialFilters)
							}
							onClick={() => setShowAlertModal(true)}
							variant="solid"
							colorScheme="brand"
						/>
						<BasicText
							style={{ cursor: 'pointer' }}
							title="Clear all parameters"
							colorScheme="primary"
							onClick={handleClearAll}
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<AlertModal
				isOpen={showAlertModal}
				onClose={() => setShowAlertModal(false)}
				onApplyNewFilter={handleApplyNewFilter}
				onUseOldFilter={handleUseOldFilter}
			/>
		</>
	)
}
