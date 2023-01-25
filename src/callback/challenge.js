const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback){

    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText))
            }else {
                const error = new Error('Error' + urlApi);
                return callback(error, null);
            } 
        }
    }
    xhttp.send();
}

fetchData(`${API}/products`, function (error1, data1) { // llamamos la función con argumentos de url y func anónima.
    if (error1) return console.error(error1); // si se genera error retornamos error, info en data 1.
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2) { // volvemos a llamar a la función.
        if (error2) return console.error(error2); // retornamos error2 (si se produce) e info guardada en data2.
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3) { // 3er llamado a la func.
            if (error3) return console.error(error3); // retorn. error3 (si se produce). Info guardada en data3.
            console.log(data1[0]); // mostramos los datos de la primer llamada (estudiar la api).
            console.log(data2.title); // mostramos los datos de la 2da llamada.
            console.log(data3.name); // 3er llamada.
        });
    });
    setTimeout( () => { // agregué este setTimeout para mostrar los mismos datos solo con el primer llamado a 5 seg.
        console.log(data1[1]); // se utilizó la posición 1 del array de la api para variar del ej. anterior.
        console.log(data1[1].title);
        console.log(data1[1].category.name);
        console.log(data1[1].price);
    }, 5000); // tiempo en milisegundos para ejecutar esos console.log.
});


// Estados llamado XMLHttpRequest

// 0 = se ha inicializado 
// 1 = cargando (loading)
// 2 = se ha cargado 
// 3 = Procesamiento si existe alguna descarga 
// 4 = Completado

// METODOS Y PROPIEDADES
// xmlhttp.open() → Prepara la petición para ser enviada tomando tres parámetros: prótocolo, url, asíncrono (true).
// xmlhttp.readyState → Retorna el estado de la petición.
// xmlhttp.onreadystatechange → Un eventHandler que es llamado cuando la propiedad readyState cambia.
// xmlhttp.status → Retorna el estado de la respuesta de la petición. (200,400,500)
// xmlhttp.send() → Envía la petición.

/// VERBOS PROTOCOLO HTTP
// GET → Solicita un recurso.
// HEAD → Solicita un recurso pero sin retornar información, la estructura de esta petición es igual que get tanto en su headers como estatus. Es útil cuando vamos a utilizar API, para comprobar si lo que vamos a enviar esta correcto y puede ser procesado.
// POST → Sirve para la creación de recursos en el servidor.
// PUT → Actualiza por completo un recurso, reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.
// PATCH → Actualiza parcialmente un recurso.
// DELETE → Elimina un recurso.


//CODIGOS DE ESTADOS DEL SERVIDOR
// El código de estado (status codes) sirve para describir el estado de la petición hecha al servidor.
// 1xx → Indican que la petición fue recibida por el servidor, pero está siendo procesada por el servidor.
// 2xx → Indican que la petición fue recibida, aceptada y procesada correctamente.
// 3xx → Indican que hay que tomar acciones adicionales para completar la solicitud.
// 4xx → Indican errores del lado del cliente que hizo mal una solicitud.
// 5xx → Indican errores del servidor. Suelen aparecer cuando existe un fallo en la ejecución en el servidor.
// .

// CODIGOS API 
// 200 → OK → Indica que todo está correcto.
// 201 → Created → Todo está correcto cuando se hizo una solicitud POST, el recurso se creó y se guardó correctamente.
// 204 → No Content → Indica que la solicitud se completó correctamente pero no devolvió información. Este es común cuando se hacen peticiones con el verbo DELETE.
// 400 → Bad Request → Indica que algo está mal en la petición (no encontró algo).
// 401 → Unauthorized → Significa que antes de hacer una solicitud al servidor nos debemos autenticar.
// 403 → Forbidden → Indica que no tenemos acceso a ese recurso aunque se esté autenticado.
// 404 → Not Found → Indica que no existe el recurso que se está intentando acceder.
// 500 → Internal Server Error → Indica que algo falló, es un error que retorna el servidor cuando la solicitud no pudo ser procesada.