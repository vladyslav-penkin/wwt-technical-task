import { FC } from 'react'

import { Box } from '@chakra-ui/react'

import { BasicText } from '@components/BasicText'

interface Props {
	id: string
	optionsIds: string[]
}

export const BasicCard: FC<Props> = ({ id, optionsIds }) => (
	<Box
		key={id}
		w="100%"
		p="40px"
		borderWidth={1}
		borderColor="gray"
		borderStyle="solid"
		borderRadius={20}
	>
		<BasicText
			title={`Id: ${id}`}
			size={'20'}
		/>
		<BasicText
			title="Filters:"
			size={'20'}
		/>
		{optionsIds.length ? (
			optionsIds.map(option => (
				<BasicText
					key={option}
					title={option}
					size={'20'}
				/>
			))
		) : (
			<BasicText
				title={`None`}
				size={'20'}
			/>
		)}
	</Box>
)
