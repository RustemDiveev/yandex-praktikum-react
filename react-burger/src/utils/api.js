const checkResponse = (response) => {
    return response.ok ? response : Promise.reject("Ошибка при обращении к API")
}

const requestApi = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export default requestApi