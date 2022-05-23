class Vector { //Se crea la clase que va a representar vectores por medio de arreglos.
    constructor(vector) {//Método constructor del vector
      this.vector = vector;
      this.n = vector.length;
    }
    getVector() {//Método que retorna el vector
      return this.vector
    }
    getLength() {//Método que retorna la dimensión del vector
      return this.n
    }
    suma(x) {//Método que recibe un parámetro x, y se lo suma a las componentes del vector
      let aux = 0;
      let result = new Array()
      for (let i = 0; i < this.n; i++) {
        aux = x + this.vector[i];
        result.push(aux)
      }
      return result
    }
    resta(x) {//Método que recibe un parámetro x, y se lo resta a las componentes del vector
      let aux = 0;
      let result = new Array()
      for (let i = 0; i < this.n; i++) {
        aux = this.vector[i] - x;
        result.push(aux)
      }
      return result
    }
    multiplicacion(x) {//Método que recibe un parámetro x, y lo multiplica con las componentes del vector
      let aux = 0;
      let result = new Array()
      for (let i = 0; i < this.n; i++) {
        aux = this.vector[i] * x;
        result.push(aux)
      }
      return result
    }
    division(x) {//Método que recibe un parámetro x, y divide las componentes del vector entre este
      let aux = 0;
      let result = new Array()
      for (let i = 0; i < this.n; i++) {
        aux = this.vector[i] / x;
        result.push(aux)
      }
      return result
    }
    norma() {//Método que retorna la norma del vector
      let aux = 0;
      let norm = 0;
      for (let i = 0; i < this.n; i++) {
        aux = aux + Math.pow(this.vector[i], 2);
        norm = Math.sqrt(aux)
      }
      return norm
    }
    normalizar() {//Método que normaliza el vector
      let aux = 0;
      let norm = 0;
      for (let i = 0; i < this.n; i++) {
        aux = aux + Math.pow(this.vector[i], 2);
        norm = Math.sqrt(aux)
      }
      let result = new Array();
      result = this.division(norm)
      return result
    }
    productoPunto(vector2) {//Método que recibe otro vector como parámetro y retorna el producto punto entre ambos
      let a = this.vector;
      let b = vector2.getVector();
      let result = 0;
      for (let i = 0; i < this.n; i++) {
        result += a[i] * b[i];
      }
      return result
    }
    calcularAngulo(vector2) {//Método que recibe otro vector como parámetro y retorna el ángulo que se forma entre ambos en grados
      let result = 0;
      let numerador = this.productoPunto(vector2);
      let denominador = this.norma() * vector2.norma();
      result = Math.acos(numerador / denominador) * (180 / Math.PI);
      return result
    }
    productoCruz(vector2) {//Método que recibe dos vectores y en caso de ser compatibles retorna el producto cruz entre ambos
      if (vector2.getLength() == this.getLength()) {
        if (this.getLength() != 3) {
          return console.log("Esta operacion solo existe para vectores de R^3")
        } else {
          let a = this.getVector();
          let b = vector2.getVector();
          let result = new Array(a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] *
            b[1] - a[1] * b[0])
          return result
        }
      }else{
        return console.log("Los tamaños de los vectores son distintos")
      }
    }
  
  }

  console.log("Lanzamiento de proyectil:");//Comienza la implementación del lanzamiento de proyectil en dos dimensiones
  
  const readline = require('readline');//Constante utilizada para leer por consola
  let interfazCaptura = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
//Definición de variables usadas para el desarrollo
var init_speed = 0;
var time_interval = 0;
var init_x = 0;
var init_y = 0;
var angle = 0;
//Definición de la fórmula cuadrática
function discrim(a, b, c)
           {
           return (b*b - 4*a*c);
          } 
           function solucionar(a, b, c, sol)
           {
           var disc = discrim(a,b,c);
           if (disc < 0)
              alert("Sin solución real");
           else
              {
              sol[0] = (-b + Math.sqrt(disc))/(2*a);
              sol[1] = (-b - Math.sqrt(disc))/(2*a);
              } 
          }
          solucionar(4.9,init_speed*(Math.sin(angle*Math.PI/180)*-1), init_y*-1, final_times);
          if(final_times[0]>final_times[1]){
            final_time=final_times[0];
          } else {
            final_time=final_times[1];
          }
//Se capturan los diferentes datos necesarios para los cálculos:
interfazCaptura.question('Ingrese la velocidad inicial del proyectil en m/s: ', function (speed) {
  interfazCaptura.question('¿Cada cuántos segundos desea obtener la posición del proyectil? ', function (time) {
    interfazCaptura.question('¿Cuál es la posición vertical (y) inicial en metros del proyectil? ', function (y) {
      interfazCaptura.question('¿Cuál es la posición horizontal (x) inicial en metros del proyectil? ', function (x) {
        interfazCaptura.question('¿Cuál es el ángulo en grados con respecto al eje horizontal (x)? ', function (degrees) {
          init_speed = parseInt(speed);
          time_interval = parseInt(time);
          init_x = parseInt(x);
          init_y = parseInt(y);
          angle = parseInt(degrees);
          //Se declaran varibles auxiliares para calcular la posición en cada instante
          let pos0 = new Array(init_x, init_y);
          var init_pos = new Vector(pos0);
          var final_times = new Array(2);
          var final_time = 0;
          //Se cierra el flujo por consola
          interfazCaptura.close();
        //Se declaran más variables auxiliares
          var time_limit = Math.floor(final_time);
          var current_x=init_x;
          var current_y=init_y;
          var current_pos=init_pos;
          var aux_array = new Array(0,0);
          //Con el siguiente ciclo se obtiene la posición del cuerpo según los intérvalos establecidos por el usuario
          for (var i = 0; i <= time_limit; i=i+time_interval) {
            current_x=(init_speed*(Math.cos(angle*Math.PI/180)*i));
            current_y=(init_y+(init_speed*(Math.sin(angle*Math.PI/180)*i))-4.9*i*i);
            aux_array[0]=current_x;
            aux_array[1]=current_y;
            current_pos= new Vector(aux_array);
            console.log("La posición en el instante "+i+" es: "+current_pos.getVector());
         }
         //Se imprime cálcula e imprime la posición final del cuerpo:
         current_x=(init_speed*(Math.cos(angle*Math.PI/180)*final_time));
          aux_array[0]=current_x;
          aux_array[1]=0;
          current_pos= new Vector(aux_array);
         console.log("El proyectil alcanza el nivel del suelo después de "+final_time+" segundos :) y termina en la posición "+ current_pos.getVector());
        });
      });
    });
  });
});
