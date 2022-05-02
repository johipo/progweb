var i = 0;
var dots = [];


(function (params) {

    window.addEventListener("mousemove", function(e){
        dots[i] = document.createElement("div");
        dots[i].className = "dot";
        dots[i].style.left = e.clientX + "px";
        dots[i].style.top = e.clientY+ "px";
        //cria div e seta informações dela

        document.body.appendChild(dots[i]);
        //aplica a o dot na pagina

        /*console.log(dots[i]);
        console.log(i);*/

        if(i==1){
            var aux = dots[1];
        }

        i++;
        if(i==7){
            document.body.removeChild(aux);
            console.log("removeu no");
            i--;
        }
    })
})()