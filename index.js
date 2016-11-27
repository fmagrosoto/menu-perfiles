// JSON de los perfiles
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







(function (){

  var pa = process.argv[2];
  var pe = process.argv[3];

  var menu = {
    'dashboard':{'nombre':'dashboard.html','acceso':[1,2,3,4]},
    'reportes':{'nombre':'reportes.html','acceso':[1]},
    'proyectos':{'nombre':'proyectos.html','acceso':[1,2,3,4]},
    'clientes':{'nombre':'clientes.html','acceso':[1,2,3]},
    'facturacion':{'nombre':'facturacion.html','acceso':[1,3]},
    'usuarios':{'nombre':'usuarios.html','acceso':[1]},
  };

  var nMenu = [];

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
  }

  console.log('\n----------\n');
  for(var x = 0; x < nMenu.length; x++) {
    console.log('> ' + nMenu[x].nombre);
  }
  console.log('\n----------\n');


})();
