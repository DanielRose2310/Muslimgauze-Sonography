export async function getRelData(_ref) {
    _ref = _ref.replace(/[\[\]\:]+/g, '')
    
        if (_ref.split(" ").length>2){_ref=_ref.split(" ").splice(0,2).join(" ")}
        
    
    let result;
    try {
        const res = await axios.get(`https://muslimgauze-database.herokuapp.com/albums/cataloguesearch/${_ref}/`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = res;
    } catch (err) {
        console.log(err)
    }
    return result
}