var ajusteFuncExpo = function(arrObjValues){

    const n = arrObjValues.length;

    const arrYOriginais = arrObjValues.map(objIteracao => {
      return objIteracao.tensionResistor;
  });

    const arrX = arrObjValues.map(objIteracao => {
        return parseFloat(objIteracao.time);
    });

    const somatorioArrX = arrX.reduce(function(acumulador, valorAtual, index, array) {
        return acumulador + valorAtual;
      });

    const arrLnTension = arrObjValues.map(objIteracao => {
        return Math.log(parseFloat(objIteracao.tensionResistor));
    });

    const somatorioArrLnTension = arrLnTension.reduce(function(acumulador, valorAtual, index, array) {
        return acumulador + valorAtual;
      });  

    const arrXAndYProduct = arrX.map((X,i)=>{
      return X * arrLnTension[i];
    })

    const somatorioArrXAndYProduct = arrXAndYProduct.reduce(function(acumulador, valorAtual, index, array) {
      return acumulador + valorAtual;
    });

    const arrXSquared = arrX.map( X => X*X)

    const somatorioArrXSquared = arrXSquared.reduce(function(acumulador, valorAtual, index, array) {
      return acumulador + valorAtual;
    });

    //a função final de ajuste é dada por ln(y) = a*x+ ln(b) => y = b * e ^ (a * x) 
    
    const a = ( ( somatorioArrX * somatorioArrLnTension ) - ( n * somatorioArrXAndYProduct ) ) / ( ( somatorioArrX * somatorioArrX ) - ( n * somatorioArrXSquared )  );

    const b = ( (somatorioArrX * somatorioArrXAndYProduct ) - ( somatorioArrLnTension * somatorioArrXSquared )) / ( (somatorioArrX * somatorioArrX) - ( n * somatorioArrXSquared ) );

    // Vc(t) = Math.exp(b) * Math.exp(a * t);

    const novosValoresDeVrAjustados = arrX.map( t => Math.exp(b) * Math.exp(a * t)) ;
    
    console.log("Ajuste de Função Calculado com Sucesso !")

    const v0 = Math.exp(b) * Math.exp(a * 0 );

    console.log("\n");

    console.log(`O valor de v é calculado quando t = 0, desta forma é dado por: ${v0} `)

    console.log("\n");
    
    C = -1 / ( 5*1000000 * a );

    console.log(`Desta forma, o valor da capacitância C após o ajuste da função exponencial aos dados obtidos na mediação é dado por: ${C}`)


    return novosValoresDeVrAjustados;
}

module.exports = ajusteFuncExpo;
