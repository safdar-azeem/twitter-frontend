export interface IForm {
	id?: string
	name: string
	label?: string
	type: string
	placeholder: string
	error: string
	required: boolean
	value?: string
}

export interface IFormState {
	[key: string]: {
		value: any
		error: string
	}
}
