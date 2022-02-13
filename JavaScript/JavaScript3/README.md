Primeiro executa a função teste, a qual foi chamada, e assim ao tentar mostrar no console
o valor de a, ele imprime "undefined" pois não foi passado um valor para ele. 
Após isso tenta mostrar no console o valor retornado pela função foo, a qual retorna 2 e assim o valor dela é mostrado. 
Por fim temos declarado o valor a e função foo.

Esse código funcionou dessa maneira pois primeiro ocorreu a leitura da função e então ela foi chamada e dessa forma o programa ja estava ciente da função dentro dela, já que uma função tem acesso a todas as variáveis
presentes nos escopos de suas funções ancestrais, mas pela variavel a ser uma variavel local, o programa não conseguiu achar o seu valor ao tentar mostrar no console
