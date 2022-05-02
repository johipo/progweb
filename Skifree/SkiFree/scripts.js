(function () {

    let FPS = 65;
    let aux_ms = 0;
    let value_ms = 0;
    let value_vida = 3;
    let saida = 0;
    let trava = 1;
    let zerou = 1;
    let trava_container = 0;

    const TAMX = 300;//largura
    const TAMY = 400;//altura

    const PROB_ARVORE = 0.8;
    const PROB_ARBUSTO_CHAMAS = 0.2;
    const PROB_PEDRA = 0.5;
    const PROB_TOCO = 0.3;
    const PROB_COGUMELO = 0.1;


    let montanha;
    let skier;
    let gameLoop;


    const arvores = [];
    const arbustos_chamas = [];
    const pedras = [];
    const tocos = [];
    const cogumelos = [];


    function init() {//tudo necessario para iniciar o jogo
        montanha = new Montanha(); //iniciando montanha
        skier = new Skier(); //iniciando skier
        placar = new Placar(); //iniciando skier

        const txt = document.createElement('div');//criar div
        montanha.element.appendChild(txt);
        txt.id = 'start';//div na placar dom
        i = document.getElementById("start");
        i.innerHTML= `Aperte Enter para começar`;

        const txt1 = document.createElement('div');//criar div
        montanha.element.appendChild(txt1);
        txt1.id = 'manual';//div na placar dom
        m = document.getElementById("manual");
        m.innerHTML= `Manual:<br>Aperte "C" para alterar a centralização<br>Aperte "F" para alternar a velocidade<br>Aperte "↓" para acelerar<br>Aperte "↑" para desacelerar<br>Aperte "←" para ir para esquerda<br>Aperte "→" para ir para direita`;

        window.addEventListener('keydown', (e) => {
            if((e.key === 'Enter')&&(trava==1)){
                montanha.element.removeChild(txt);
                montanha.element.removeChild(txt1);
                trava = 0;
                gameLoop = setInterval(run, 1000/FPS);//executa a funcao run a cada 1000milisegundo = 1se
            }
        })
        
    }

    function fim_de_jogo(){
        const texto1 = document.createElement('div');//criar div
        montanha.element.appendChild(texto1);
        texto1.id = 'fim';//div na placar dom
        arvores.forEach((a) => {//na teoria remover arvore
            a.element.className = '';
        });
        arbustos_chamas.forEach((a) => {//na teoria remover arvore
            a.element.className = '';
        });
        pedras.forEach((a) => {//na teoria remover arvore
            a.element.className = '';
        });
        tocos.forEach((a) => {//na teoria remover arvore
            a.element.className = '';
        });
        cogumelos.forEach((c) => {//na teoria remover arvore
            c.element.className = '';
        });

        f = document.getElementById("fim");
        f.innerHTML= `FIM DE JOGO`;

        const texto2 = document.createElement('div');//criar div
        montanha.element.appendChild(texto2);
        texto2.id = 'reiniciar';//div na placar dom
        r = document.getElementById("reiniciar");
        r.innerHTML= `Aperte r para reiniciar`;
    }

    function morreu(){
        saida = 1;
        skier.sem_vida();
        clearInterval(gameLoop);
        fim_de_jogo();
        //montanha.element.style.backgroundColor = 'red';
        clearTimeout()
    }

    window.addEventListener('keydown', (e) => {//mov dir e esq
        if((saida==0)&&(trava==0)){
            if(e.key === 'ArrowLeft'){
                skier.mudarDirecao(-1);
            }else if(e.key === 'ArrowRight'){
                skier.mudarDirecao(+1);
            }
        }
    })

    window.addEventListener('keydown', (e) => {//muda a velocidade com f
        if(e.key ==='f'){
            if(FPS == 65){
                FPS = 100;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 1000/FPS);

            }else if(FPS == 100){
                FPS = 65;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 1000/FPS);
            }
            console.log('FPS mudou para '+FPS);
        }
    })

    window.addEventListener('keydown', (e) => {//muda a velocidade com setas
        if(trava==0){
            if((e.key ==='ArrowDown')){
                FPS+=25;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 1000/FPS);
            }else if((e.key ==='ArrowUp')&&(FPS>15)){
                FPS-=25;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 1000/FPS);
            }
        }
    })

    window.addEventListener('keydown', (e) => {//reiniciar jogo
        if((e.key ==='r')&&(zerou==0)){
            window.location.reload(true);
        }
    })
    
    window.addEventListener('keydown', (e) => {//reiniciar jogo
        if((e.key ==='c')&&(trava==1)){
            let target = document.querySelector("#target");
            if(trava_container==1){
                target.className = "container0";
                trava_container=0;
            }else{
                target.className = "container1";
                trava_container=1;
            }
        }
    })

    class Montanha {
        constructor() {
            this.element = document.getElementById("montanha");
            this.element.style.width = `${TAMX}px`;
            this.element.style.height = `${TAMY}px`;
        }
    }

    class Skier {
        constructor() {
            this.element = document.getElementById("skier");
            this.direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
            this.direcao = 1;
            this.element.className = this.direcoes[this.direcao];//quando cria o obj sera essa direção
            this.element.style.top = '20px';
            this.element.style.left = `${parseInt(TAMX/2 -8)}px`;
        }
        mudarDirecao(giro){
            if(this.direcao+giro >= 0 && this.direcao + giro <=2){
                this.direcao +=giro;
                this.element.className = this.direcoes[this.direcao];
            }
        }
        andar(){
            if(this.direcao === 0){//parede da esquerda
                if(parseInt(this.element.style.left) > 1){
                    this.element.style.left = `${parseInt(this.element.style.left)-1}px`
                }
            }
            if(this.direcao === 2){//parede da direita
               if(parseInt(this.element.style.left) < 278){
                    this.element.style.left = `${parseInt(this.element.style.left)+1}px`
               }
                
            }
        }
        sem_vida(){
            this.element.className = 'morreu';  
        }
        bateu(){
            this.element.className = 'caiu';
            clearInterval(gameLoop);
            setTimeout(function(){
                window.dispatchEvent(new KeyboardEvent('keydown', {
                    'key': 'ArrowRight',
                }));
                window.dispatchEvent(new KeyboardEvent('keydown', {
                    'key': 'ArrowLeft',
                }));
                window.dispatchEvent(new KeyboardEvent('keydown', {
                    'key': 'ArrowDown',
                }));
            }, 500);
        }
    }
    class Arvore{
        constructor () {
            this.element = document.createElement('div');//criar div
            montanha.element.appendChild(this.element);//colocar id arvore no div
            this.element.className = 'arvore';//div na arvore dom
            this.element.style.top = `${TAMY}px`
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`//Math.floor() para pegar um inteiro
            //criar arvores de forma randomica no x.
        }
    }

    class ArvoreChamas{
        constructor () {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'arvore-chamas';
            this.element.style.top = `${TAMY}px`
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`
        }
    }

    class Pedras{
        constructor () {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'pedras';
            this.element.style.top = `${TAMY}px`
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`
        }
    }

    class Tocos{
        constructor () {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'tocos';
            this.element.style.top = `${TAMY}px`
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`
        }
    }

    class Cogumelos{
        constructor () {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'cogumelos';
            this.element.style.top = `${TAMY}px`
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`
        }
    }

    class Placar{
        constructor () {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.id = 'placar';
            this.element.className = 'placar';            
        }
        incremento_e_vida(){//metros percorridos
            aux_ms += value_ms/(10000/FPS);
            //value_ms=value_ms/aux_ms;
            if(value_vida==-1){
                value_vida = 0;
                zerou = 0;
            }
            document.getElementById("placar").innerHTML = `Placar: ${parseInt(++(aux_ms)/200)} m/s <br> Vida: ${value_vida}`;
            if(saida==0){
                if(montanha.element.style.backgroundColor == 'darkgray'){
                    setTimeout(function(){
                        montanha.element.style.backgroundColor = 'white';
                    }, 20000);
                }else if(montanha.element.style.backgroundColor == 'white'){
                    setTimeout(function(){
                        montanha.element.style.backgroundColor = 'darkgray';
                    }, 20000);
                }
            }
        }
    }


    function run() {//funcao que vai fazer tudo acontecer no jogo
        const random = Math.random() * 100;
        if(random <= PROB_ARVORE){
            const arvore = new Arvore();
            arvores.push(arvore);//arvore sendo inserida no vetor arvores
        }
        arvores.forEach((a) => {
            a.element.style.top = `${parseInt(a.element.style.top)-1}px`//converter para inteiro removendo o px
        });//passada em cada arvore
        arvores.forEach((a) => {//na teoria remover arvore
            if(parseInt(a.element.style.top) < -35){
                arvores.shift();
                a.element.className = '';
            }
        });

        if(random <= PROB_ARBUSTO_CHAMAS){
            const arbusto_chama = new ArvoreChamas();
            arbustos_chamas.push(arbusto_chama);
        }
        arbustos_chamas.forEach((a) => {
            a.element.style.top = `${parseInt(a.element.style.top)-1}px`
        });
        arbustos_chamas.forEach((a) => {
            if(parseInt(a.element.style.top) < -35){
                arbustos_chamas.shift();
                a.element.className = '';
            }
        });

        if(random <= PROB_PEDRA){
            const pedra = new Pedras();
            pedras.push(pedra);
        }
        pedras.forEach((p) => {
            p.element.style.top = `${parseInt(p.element.style.top)-1}px`
        });
        pedras.forEach((p) => {
            if(parseInt(p.element.style.top) < -35){
                pedras.shift();
                p.element.className = '';
            }
        });

        if(random <= PROB_TOCO){
            const toco = new Tocos();
            tocos.push(toco);
        }
        tocos.forEach((t) => {
            t.element.style.top = `${parseInt(t.element.style.top)-1}px`
        });
        tocos.forEach((t) => {
            if(parseInt(t.element.style.top) < -35){
                tocos.shift();
                t.element.className = '';
            }
        });

        if(random <= PROB_COGUMELO){
            const cogumelo = new Cogumelos();
            cogumelos.push(cogumelo);
        }
        cogumelos.forEach((c) => {
            c.element.style.top = `${parseInt(c.element.style.top)-1}px`
        });
        cogumelos.forEach((c) => {
            if(parseInt(c.element.style.top) < -35){
                cogumelos.shift();
                c.element.className = '';
            }
        });

        skier.andar();

        arvores.forEach((a) => {//batida na arvore
            if(parseInt(a.element.style.top) ==25){
                if((parseInt(a.element.style.left)-10 <= parseInt(skier.element.style.left)) && (parseInt(skier.element.style.left) <= parseInt(a.element.style.left)+20)){
                    skier.bateu();
                    a.element.className = '';
                    value_vida--;
                }
            }
        });

        arbustos_chamas.forEach((a) => {//batida na arbusto
            if(parseInt(a.element.style.top) ==35){
                if((parseInt(a.element.style.left)-10 <= parseInt(skier.element.style.left)) && (parseInt(skier.element.style.left) <= parseInt(a.element.style.left)+20)){
                    skier.bateu();
                    a.element.className = '';
                    value_vida--;
                }
            }
        });

        pedras.forEach((p) => {//batida na pedra
            if(parseInt(p.element.style.top) ==45){
                if((parseInt(p.element.style.left)-12 <= parseInt(skier.element.style.left)) && (parseInt(skier.element.style.left) <= parseInt(p.element.style.left)+22)){
                    skier.bateu();
                    p.element.className = '';
                    value_vida--;
                }
            }
        });

        tocos.forEach((t) => {//batida na tocos
            if(parseInt(t.element.style.top) ==45){
                if((parseInt(t.element.style.left)-12 <= parseInt(skier.element.style.left)) && (parseInt(skier.element.style.left) <= parseInt(t.element.style.left)+22)){
                    skier.bateu();
                    t.element.className = '';
                    value_vida--;
                }
            }
        });

        cogumelos.forEach((c) => {//batida na cogumelo
            if(parseInt(c.element.style.top) ==50){
                if((parseInt(c.element.style.left)-10 <= parseInt(skier.element.style.left)) && (parseInt(skier.element.style.left) <= parseInt(c.element.style.left)+20)){
                    c.element.className = '';
                    value_vida++;
                }
            }
        });


        placar.incremento_e_vida();
        if(zerou == 0){
            morreu();
            clearInterval(gameLoop);
        }
    }
    init();
})()