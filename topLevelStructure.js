const ajusteFuncExpo =  require('./functions/ajusteFuncExpo');
const retornaXValues = require('./functions/retornaXValues');

const { pipeline } = require('stream'),
     es = require('event-stream'),
     { promisify } = require('util'),
     pipelineAsync = promisify(pipeline),
     createReadStream = require('./functions/createReadStream'),
     splitStreamEachLine = require('./functions/splitStreamEachLine')


module.exports = (async function run(){    

    arrObjValues = [];

    try{
            await pipelineAsync(

                createReadStream(),

                splitStreamEachLine(), 

                es.mapSync( lineChunk => {
                    chunkPreFiltered = lineChunk.match(/(?<time>[\d.,e+-]+)\s(?<tensionResistor>[\d.,e+-]+)/m); //armazena na posição 1 e 2 de um array os dados de entrada e saída de cada linha, respectivamente
                    arrObjValues.push(JSON.parse(JSON.stringify(chunkPreFiltered.groups))); // insere no array criado para armazenar objetos, o objeto contendo os grupos destacados pelo regex
                })
            );

            const arrNovosValoresDeVrAjustados = ajusteFuncExpo(arrObjValues);

            const arrXValues = retornaXValues(arrObjValues);

            const arrNewObjValues = arrNovosValoresDeVrAjustados.map( (item , i)=>{
                return {  t: parseFloat(arrXValues[i]), Vr: item, }
            })

            console.log("\n");

            console.log("A tabela com os novos valores de Vr após ajuste pode ser visto abaixo:");
        
            console.table(arrNewObjValues);

            console.log("\n");

        }
        
    catch(err){
        console.log(err)
    }
            
})();