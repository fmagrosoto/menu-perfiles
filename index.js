/**
* JSON de los perfiles
* Solo como pero recordatorio de cómo pudiera ser un perfil de roles.
* Se muestra para fines demostartivos.
*/
var perfiles = [
  {
    'nombre': 'super usuario',
    'id': 1
  },
  {
    'nombre': 'ejecutivo de ventas',
    'id': 2
  },
  {
    'nombre': 'administrativo de ventas',
    'id': 3
  },
  {
    'nombre': 'ejecutivo de operaciones',
    'id': 4
  }
];


/**
 * Función tipo Clousure para reemplazar acentos, mayúsculas y espacios en una cadena de texto.
 * Muy parecido a un permalink - OJO, puede hacer permalink con solo reemplazar
 * el espacio con un guión:
 * return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
 * @author Fernando Magrosoto
 */
var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
    mapping[ from.charAt( i ) ] = to.charAt( i );
  return function( str ) {
    var ret = [];
    for( var i = 0, j = str.length; i < j; i++ ) {
      var c = str.charAt( i );
      if( mapping.hasOwnProperty( str.charAt( i ) ) )
        ret.push( mapping[ c ] );
      else
        ret.push( c );
    }
    return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '' ).toLowerCase();
  }
})();


/**
 * Función anónima donde se auto ejecuta el algortmo y eviatar que sea reutilizable
 */
(function (){

  var pa = process.argv[2];
  var pe = process.argv[3];

  var menu = {
    'dashboard':{'nombre':'Dashboard','url':'dashboard.html','acceso':[1,2,3,4]},
    'reportes':{'nombre':'Reportes','url':'reportes.html','acceso':[1]},
    'proyectos':{'nombre':'Proyectos','url':'proyectos.html','acceso':[1,2,3,4]},
    'clientes':{'nombre':'Clientes','url':'clientes.html','acceso':[1,2,3]},
    'facturacion':{'nombre':'Facturación','url':'facturacion.html','acceso':[1,3]},
    'usuarios':{'nombre':'Usuarios','url':'usuarios.html','acceso':[1]},
    'micuenta':{'nombre':'Mi cuenta','url':'miCuenta.html','acceso':[1,2,3,4]}
  };

  var nMenu = [];

  if(menu.hasOwnProperty(pa)){

    // Saber si tiene acceso
    var actual = menu[pa];
    var acceso = actual.acceso;
    var indicador = acceso.indexOf(Number(pe));
    if (indicador === -1) {
      console.error('\n----------\nRebótalo, es un intruso\n----------\n');
      return;
    } else {
      // Pintar menú
      for (var prop in menu){
        var perfiles =  menu[prop].acceso;
        if (perfiles.indexOf(Number(pe)) !== -1) {
          nMenu.push(menu[prop]);
        }
      }

      console.log('\n----------\n');
      for(var x = 0; x < nMenu.length; x++) {
        var activado = (normalize(nMenu[x].nombre) === pa) ? ' > activado' : '';
        console.log('> ' + nMenu[x].url + activado);
      }
      console.log('\n----------\n');

    }

  } else {
    console.error('\n----------\nRebótalo, no existe la página\n----------\n');
    return;
  }


})();
