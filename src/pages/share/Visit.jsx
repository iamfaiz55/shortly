import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPubllicUrlQuery } from '../../redux/api\'s/urlApi'

const Visit = () => {
    const { id } = useParams()
    const { data, isSuccess, isError } = useGetPubllicUrlQuery(id)
    useEffect(() => {
        if (isSuccess) {
            window.location.href = data
        }
    }, [isSuccess])

    return
}

export default Visit