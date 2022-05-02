(function (){
    let bot = document.getElementById("botao");
    let b1 = document.getElementById("barra1");
    let b2 = document.getElementById("barra2");
    let b3 = document.getElementById("barra3");
    let b4 = document.getElementById("barra4");

    bot.onclick = () => {
        b1.style.position="absolute";
        b2.style.position="absolute";
        b3.style.position="absolute";
        b4.style.position="absolute";

        b1.style.height=document.form.barra1.value+"px";
        b2.style.height=document.form.barra2.value+"px";
        b3.style.height=document.form.barra3.value+"px";
        b4.style.height=document.form.barra4.value+"px";

        b1.style.bottom=document.form.barra1.value+"px";
        b2.style.bottom=document.form.barra1.value+"px";
        b3.style.bottom=document.form.barra1.value+"px";
        b4.style.bottom=document.form.barra1.value+"px";

        b2.style.left = document.form.largura.value+"px";
        b3.style.left = 2*document.form.largura.value+"px";
        b4.style.left = 3*document.form.largura.value+"px";

        b1.style.width=document.form.largura.value+"px";
        b2.style.width=document.form.largura.value+"px";
        b3.style.width=document.form.largura.value+"px";
        b4.style.width= document.form.largura.value+"px";

        b1.style.backgroundColor="red";
        b2.style.backgroundColor="red";
        b3.style.backgroundColor="red";
        b4.style.backgroundColor="red";


    }
})();

