var retornaXValues = function(arrObjValues){
    arrXValues = arrObjValues.map(obj => obj.time);
    return arrXValues;
}

module.exports = retornaXValues;