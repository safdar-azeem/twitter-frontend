import React, { useState } from 'react'
import { IForm, IFormState } from '../types/form.type'

const useForm = (formJson: IForm[]) => {
   const getInitialState = () => {
      let formValues: IFormState = {}
      formJson.forEach((formItem: IForm) => {
         formValues[formItem.name] = {
            value: formItem?.value || '',
            error: '',
         }
      })
      return formValues
   }

   const [form, setForm] = useState<IFormState>(getInitialState)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target
      const formItem = formJson.find((item) => item.name === name)
      const error = value === '' && formItem?.error ? formItem.error : ''
      setForm({
         ...form,
         [name]: {
            ...form[name],
            value: value,
            error,
         },
      })
   }

   const doValidate = () => {
      let errors: IFormState = {}
      formJson.forEach((formItem: IForm) => {
         if (formItem.required && form && !form[formItem.name].value) {
            errors = {
               ...errors,
               [formItem.name]: {
                  value: form[formItem.name].value,
                  error: form[formItem.name].value ? '' : formItem.error,
               },
            }
         }
      })
      setForm({ ...form, ...errors })
      return Object.keys(errors).length === 0
   }

   const setFormError = (name: string, error?: string) => {
      const formItem = formJson.find((item) => item.name === name)
      const formItemError = error || formItem?.error || ''
      const newForm: IFormState = { ...form }
      newForm[name] = {
         ...newForm[name],
         error: formItemError,
      }
      setForm(newForm)
   }

   return { form, handleChange, doValidate, setFormError }
}

export default useForm
