import React, { useState } from 'react'

export function useForm(getModelDataObject) {

    const [values, setValues] = useState(getModelDataObject());
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetFormControls = () => {
        setValues(getModelDataObject());
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }
}
