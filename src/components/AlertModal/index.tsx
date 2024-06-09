import { FC } from 'react'

import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

import { useResize } from '@/hooks/useResize'
import { BasicButton } from '@components/BasicButton'

interface Props {
	isOpen: boolean
	onClose: () => void
	onApplyNewFilter: () => void
	onUseOldFilter: () => void
}

export const AlertModal: FC<Props> = ({
	isOpen,
	onClose,
	onApplyNewFilter,
	onUseOldFilter
}) => {
	const isTablet = useResize()
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent
				minW="100%"
				gap="60px"
				p={isTablet ? '60px' : '60px 20px'}
			>
				<ModalHeader
					fontSize="2.3rem"
					border="none"
				>
					{'Do you want to apply new filter?'}
				</ModalHeader>
				<ModalCloseButton
					size="24px"
					p="20px"
				/>
				<ModalFooter
					display="flex"
					flexDir={isTablet ? 'row' : 'column'}
					justifyContent="center"
					gap={4}
				>
					<BasicButton
						title="Use old filter"
						width="184px"
						height="64px"
						fontSize="sm"
						onClick={onUseOldFilter}
						variant="outline"
						colorScheme="gray"
					/>
					<BasicButton
						title="Apply new filter"
						width="184px"
						height="64px"
						fontSize="sm"
						onClick={onApplyNewFilter}
						variant="solid"
						colorScheme="brand"
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
