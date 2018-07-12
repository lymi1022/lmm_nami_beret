const parseJSON = (json, fallback) => {
    let result = fallback
    try {
        result = JSON.parse(json)
    } catch (error) {
        console.log(error)
    }
    return result
}
export default parseJSON