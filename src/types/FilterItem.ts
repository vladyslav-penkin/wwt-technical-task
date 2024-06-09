import { FilterOption } from './FilterOption'

export interface FilterItem {
	id: string
	name: string
	description: string
	type: string
	options: FilterOption[]
}
