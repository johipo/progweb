(function (){
    let bot = document.getElementById("botao");
    bot.onclick = () => {
        document.myForm.area.value = Math.round(Math.PI *(Math.pow(document.myForm.raio.value, 2))*100)/100;
        document.myForm.circ.value = Math.round(2*Math.PI * document.myForm.raio.value*100)/100;
    }
})();

