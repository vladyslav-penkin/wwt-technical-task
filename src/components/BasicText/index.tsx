import { FC } from 'react'

import { Text, TextProps } from '@chakra-ui/react'

interface Props extends TextProps {
	title: string
	style?: object
	otherProps?: object
}

export const BasicText: FC<Props> = ({
	title,
	colorScheme = 'primary',
	size = 12,
	onClick,
	style,
	...otherProps
}) => {
	return (
		<Text
			fontSize={size}
			colorScheme={colorScheme}
			onClick={onClick}
			style={style}
			{...otherProps}
		>
			{title}
		</Text>
	)
}
