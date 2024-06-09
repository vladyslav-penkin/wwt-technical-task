import { FC } from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
	title: string
}

export const BasicButton: FC<Props> = ({
	title,
	width,
	height,
	size,
	isDisabled,
	variant = 'solid',
	colorScheme = 'brand',
	onClick,
	...otherProps
}) => {
	return (
		<Button
			w={width}
			h={height}
			fontSize={size}
			isDisabled={isDisabled}
			variant={variant}
			colorScheme={colorScheme}
			onClick={onClick}
			{...otherProps}
		>
			{title}
		</Button>
	)
}
