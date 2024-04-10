import { useState, ChangeEvent } from "react"


const useForm = <T>(inputValues: T) => {
  const [values, setValues] = useState<T>(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues({...values, [name]: value})
  }

  return {values, handleChange, setValues}
}

export default useForm