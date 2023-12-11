type TStorage = {
    userId: string,
    userName: string,
    taskId: string,
    taskName: string,
    listGroupId: string
}

export const getLS = (key: keyof TStorage) => {
    let value: string = localStorage.getItem(key) || ''
    if (/^{/.test(value)) { // check if value is an object
        value = JSON.parse(value)
    }
    return value
}

export const setLS = (key: keyof TStorage, value: string | object) => {
    if (typeof value == 'object') {
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        localStorage.setItem(key, value)
    }
}