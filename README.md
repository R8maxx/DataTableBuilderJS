## Datables librerias

- ES: Aquí dejamos una mini librería para poder usar los datatables de manera más sencilla
- EN: Here we leave a mini library to be able to use the datatables more easily.

***

### Dependencias

```javascript
<!-- JQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- jQuery UI -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>

<!-- DataTables CSS y JS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<!-- Select2 CSS y JS -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/js/select2.min.js"></script>
```

***

### Ejemplos de uso
```javascript
// Definir las columnas y sus propiedades
const columns = [
    { data: 'id', title: 'ID', filterType: 'input' }, 
    { data: 'titulo', title: 'Título', filterType: 'input' }, 
    { data: 'emails', title: 'Emails Dirigidos', filterType: 'input' },
    { data: 'fecha_creacion', title: 'Fecha Creación', filterType: 'date' }, 
    { data: 'eliminar', title: 'Eliminar', orderable: false }
];

// Opciones adicionales (si las necesitas)
const options = {
    order: [[0, 'asc']]
};

// Inicializar la tabla
initDataTableWithFilters('#tabla-container', 'id_grid', columns, options);
```

```html
//Contenedor donde se insertará la tabla
<div id="tabla-container"></div>
```