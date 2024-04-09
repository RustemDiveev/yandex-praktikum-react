import { useState, FormEvent } from "react"


const useForm = (inputValues: {[key: string]: any} = {}) => {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event: FormEvent) => {
    const { value, name } = event.target as HTMLInputElement
    setValues({...values, [name]: value})
  }

  return {values, handleChange, setValues}
}

export default useForm