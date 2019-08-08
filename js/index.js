var operators = ['+','-','*','/'];
var option = '';
// seta as dificultades para facil
var maxNumberSort = 30;
var minNumberSort = 10;
var hits = 0;
var failure = 0;


var level = parseInt(prompt("Nivel do jogo\n1) facil\n2) medio\n3) dificil\n4) insano"));
// switch de quanto maior o nivel maior o range dos valores a ser sorteado

if (!Number.isInteger(level)) {
  level = 1;
}

switch (level) {
  case 2:
    maxNumberSort = 100;
    minNumberSort = 10;
    break;
  case 3:
    maxNumberSort = 150;
    minNumberSort = 50;
    break;
  case 4:
    maxNumberSort = 1500;
    minNumberSort = 100;
    break;
}
do {
  // gera os dois numeros aleatoriamente
  var number1 = Math.floor(Math.random() * (maxNumberSort - minNumberSort + 1) + minNumberSort);
  var number2 = Math.floor(Math.random() * (maxNumberSort - minNumberSort + 1) + minNumberSort);
  // gera o operador para fazer o calculo
  var operatorIndex = Math.floor(Math.random() * (level + 1));

  if (operatorIndex >= operators.length) { // se o operador passar o tamanho do array ele seta para o ultimo operador
    operatorIndex =  operators.length - 1;
  }
  var result = 0;
  switch (operators[operatorIndex]) {
    case '+':
    result = number1 + number2;
    break;
    case '-':
    result = number1 - number2;
    break;
    case '*':
    result = number1 * number2;
    break;
    case '/':
    result = number1 / number2;
    break;
  }

  // adiciona o resultado certo a lista de opcoes
  var optionsToChoice = [];
  optionsToChoice.push(result);
  // gera um coificiente randomico, 50% acima e 50% abaixo
  var max = result * 1.5;
  var min = result * 0.5;
  if (Math.abs(result) === 1) {
    max = 10;
    min = -10;
  }
  // verifica se o numero e inteiro
  var isInteger = result % 1 === 0;
  // Gera as alternativas aleatoriamente
  for (var i = 0; i < 3; i++) {
    do {
      var nb; // variavel que recebe o numero gerado

      if (isInteger) { // se o numero e inteiro ele vai arrendodar as alternativas tambem para inteiro
        nb = (Math.floor(Math.random() * (max - min + 1) + max));
      } else {
        // senao gera alternativas com ponto flutuante
        nb = (Math.random() * (max - min + 1) + max);
      }
      // procura dentro do array se ha alguma alternativa com o mesmo valor para nao ter duas alternativas iguais
      var found = optionsToChoice.find(function (item) {
          return (item === nb);
      })
      // se ele nao encontrar adiciona o numero gerado no array
      if (!found) {
        optionsToChoice.push(nb);
      }
      // caso ele nao encontrar ele recomeca o processo de gerar o numero aleatorio
    } while (found);
  }
  // faz um shuffle das opcoes da lista
  optionsToChoice = optionsToChoice.sort(function() { return 0.5 - Math.random() });
  // cria as opcoes nomeadas, a,b,c,d
  var optionsNamed = ['a', 'b', 'c', 'd'];
  // gera a saida da questao na tela
  var output = "Qual o valor da equação: " + number1 + " " + operators[operatorIndex] + " " + number2 + " ?\n";
  for(var j = 0; j < optionsNamed.length; j++) {
    output += optionsNamed[j] + ") " + optionsToChoice[j] + "\n";
  }
  var idxSelected = null;
  var choice = null;
  do {
    choice = prompt(output); // pergunta ao usuario qual a alternativa correta
    for(var i in optionsNamed) { // for que varre a lista em busca da opcao certa
      if (optionsNamed[i] === choice) {
        idxSelected = i; // armazena o indice selecionado, a=0, b=1, c=2, d=3
      }
    }
    // caso ele escolher algo diferente ele pede de novo
  } while (idxSelected === null);
  // agora temos a opcao selecionada do usuario, optionsToChoice[idxSelected]
  var message = '';
  if (optionsToChoice[idxSelected] === result) { // basta validar com o result para saber se e igual
    hits++;
    message = 'Parabéns vc acertou!';
  } else {
    failure++;
    message = 'Que pena vc errou!';
  }

  message += "\n(s) para sair";
  option = prompt(message); // pergunta ao usuario se ele quer sair ou continuar
} while (option !== 's');

alert ("Acertos: " + hits + "\nErros: " + failure);
