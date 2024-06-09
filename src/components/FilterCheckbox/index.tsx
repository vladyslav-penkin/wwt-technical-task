import { FC } from 'react'

import { Checkbox } from '@chakra-ui/react'

interface Props {
	name: string
	isChecked: boolean
	onChange: () => void
}

export const FilterCheckbox: FC<Props> = ({ name, isChecked, onChange }) => {
	return (
		<Checkbox
			w="max-content"
			isChecked={isChecked}
			onChange={onChange}
		>
			{name}
		</Checkbox>
	)
}
