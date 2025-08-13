
const  player1 = {
    NOME:"Mário",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 1,
};

const  player2 = {
    NOME:"Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 1,
};


async function Get_Random_Block() {
    let random = Math.random();
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA"
            break;
    
        default:
            result = "CONFRONTO"
            break;
            
    }

    return result;
}

// Encapsulameto
 async function Log_Roll_Result(charater_Name, block, Dice_Result0, attribute) {
    console.log(`${charater_Name} 🎲 Rolou um dado de ${block} ${Dice_Result0} + ${attribute} = ${Dice_Result0 + attribute}`);
}

async function Roll_Dice(){
  return Math.floor(Math.random() * 6)  + 1; // Chamar um número aleatório de 0 e 5.

};

async function play_Race_Engine(charater1, charater2){

    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await Get_Random_Block();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let Dice_Result =  await Roll_Dice();
        let Dice_Result2 =  await Roll_Dice();

        // teste de hablidade
        let Total_Test_Skill1 = 0;
        let Total_Test_Skill2 = 0;

        if(block === "RETA" ){
            Total_Test_Skill1 = Dice_Result + charater1.VELOCIDADE;
            Total_Test_Skill2 = Dice_Result2 + charater2.VELOCIDADE;

            await Log_Roll_Result(
                charater1.NOME,
                "velocidade",
                Dice_Result,
                charater1.VELOCIDADE
                );

            await Log_Roll_Result(
                charater2.NOME,
                "velocidade",
                Dice_Result,
                charater2.VELOCIDADE
                );
        }
        if(block === "CURVA" ){
            Total_Test_Skill1 = Dice_Result + charater1.MANOBRABILIDADE;
            Total_Test_Skill2 = Dice_Result2 + charater2.MANOBRABILIDADE;

            await Log_Roll_Result(
                charater1.NOME,
                "manobrabilidade", 
                Dice_Result,
                charater1.MANOBRABILIDADE
                );

            await Log_Roll_Result(
                charater2.NOME,
                "manobrabilidade",
                Dice_Result,
                charater2.MANOBRABILIDADE
                );
        }

        if(block === "CONFRONTO" ){
            let Power_Result = Dice_Result + charater1.PODER;
            let Power_Result2 = Dice_Result2 + charater2.PODER;

            console.log(`${charater1.NOME} confrontou ${charater2.NOME}! 🥊 `);

                await Log_Roll_Result(
                charater1.NOME,
                "poder", 
                Dice_Result,
                charater1.PODER
                );

            await Log_Roll_Result(
                charater2.NOME,
                "poder",
                Dice_Result,
                charater2.PODER
                );

                if(Power_Result > Power_Result2 && charater2.PONTOS > 0 ){
                    console.log(`${charater2.NOME} ganhou o confronto e ${charater1.NOME} Perdeu 1 Ponto`);
                    charater2.PONTOS --;
                }

                if(Power_Result2 > Power_Result && charater1.PONTOS > 0){
                    console.log(`${charater1.NOME} ganhou o confronto e ${charater2.NOME} Perdeu 1 Ponto`);
                    charater1.PONTOS --;
                }

                console.log(
                    Power_Result2 === Power_Result ? 
                    `Confronto empatado| Nenhum ponto foi perdido`
                    : ``
                );  
        };

        // verificando o vencedor
        if(Total_Test_Skill1 > Total_Test_Skill2){
            console.log(`${charater1.NOME} Marcou um ponto!`);
            charater1.PONTOS++;
        } else if(Total_Test_Skill2 > Total_Test_Skill1){
            console.log(`${charater2.NOME} Marcou um ponto!`);
            charater2.PONTOS++;
        }   
        
        console.log(`---------------------------------------------------------`);
        
    }
};

async function Declare_Winner(charater1, charater2) {
    console.log(`Resultado final: \n`);
    console.log(`${charater1.NOME} : ${charater1.PONTOS} pontos`) ;
    console.log(`${charater2.NOME} : ${charater2.PONTOS} pontos`)    ;
        

        if(charater1.PONTOS > charater2.PONTOS){
            console.log(`\n ${charater1.NOME} venceu a corrida! Parabéns 🏆`);
        } else if(charater2.PONTOS > charater1.PONTOS){
             console.log(`\n ${charater2.NOME} venceu a corrida! Parabéns 🏆`);
        } else{
            console.log(`A corrida terminou em empate`)
        }
}

(async function main(){
    console.log(
        `🏁🏃 Corrida Entre ${player1.NOME} e ${player2.NOME} começando... \n`
    );

   await play_Race_Engine(player1, player2); // await serve para esperar
   await Declare_Winner(player1, player2);
})();


