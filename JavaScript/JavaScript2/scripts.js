function randnum(){
    var ia = Math.floor(Math.random()*3+1);
    return ia;
}

function opcoes(){
    console.log("Escolha uma jogada\n");
    console.log("1 - Papel\n");
    console.log("2 - Pedra\n");
    console.log("3 - Tesoura\n");
}

function jogada_ia(ia){
    if(ia == 1){
        console.log("O computador jogou Papel\n");
    }else if(ia == 2){
        console.log("O computador jogou Pedra\n");
    }else{//3
        console.log("O computador jogou Tesoura\n");
    }
}

function jogada_vc(ia){
    if(ia == 1){
        console.log("Você jogou Papel\n");
    }else if(ia == 2){
        console.log("Você jogou Pedra\n");
    }else{//3
        console.log("Você jogou Tesoura\n");
    }
}

function calc_venc(ia, user){
    var retornador = 0;
    //0 - computador vencedor
    //1 - jogador vencedor
    if(ia==1){
        if(user==2){
            retornador = 0;
        }else{//3
            retornador = 1;
        }
    }else if(ia==2){
        if(user==1){
            retornador = 1;
        }else{//3
            retornador = 0;
        }
    }else{//3
        if(user==1){
            retornador = 0;
        }else{//2
            retornador = 1;
        }
    }
    return retornador;
}

function jogo(){       
    var derrota = 0;
    var vitorias = 0;
    while(derrota == 0){
        opcoes();
        var user = parseInt(prompt());
        if((user!=1)&(user!=2)&(user!=3)){
            derrota=1;
        }
        var ia = randnum();
        if(derrota == 0){
            jogada_ia(ia);
            jogada_vc(user);
            if(ia == user){
                console.log("A rodada empatou!\n");
            }else{
                var vencedor = calc_venc(ia, user);
                if(vencedor == 1){
                    console.log("Você ganhou!\n");
                    vitorias++;
                }else{
                    derrota = 1;
                }   
            }
        }
    }
    console.log("Você perdeu! A sua pontuação foi de " + vitorias);
}


