for(j=1;j<=10;j++){
    for(i=1;i<=10; i++){
        if(i==1){
            document.write("<table><tr><td colspan='2'>Produtos do " + j + "</td></tr>");
        }
        document.write("<tr><td>"+ j +"X" + i + "</td><td>"+ j*i + "</td></tr>");
        if(i==10){
            document.write("</table><br/>");
        }
    }
}