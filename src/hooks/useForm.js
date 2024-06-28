import { useEffect, useState } from 'react'

export const useForm = (initialValues = {}, validation, fn) => {
  const [formState, setFormState] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) {
        fn()
      }
      setSubmit(false)
    }
  }, [submit])

  useEffect(() => {
    setFormState(initialValues)
  }, [initialValues])

  const onHandleBlur = () => {
    setErrors(validation(formState))
  }

  const onInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value
    })
  }

  const onResetForm = () => {
    setFormState(initialValues)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setErrors(validation(formState))
    setSubmit(true)
  }

  return {
    ...formState,
    errors,
    formState,
    onHandleBlur,
    onInputChange,
    onSubmit,
    onResetForm
  }
}