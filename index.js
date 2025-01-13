// Archivo: initDataTables.js
/*jshint esversion: 6 */
/*globals $:false */

function initDataTableWithFilters(containerSelector, tableId, columns, options = {}) {

	// Construir la estructura básica de la tabla
	const table = $(`
        <table id="${tableId}" class="table table-striped table-bordered table-responsive" width="100%" cellspacing="0">
            <thead>
                <tr></tr>
            </thead>
            <tfoot class="filters" style="display: table-header-group !important;">
                <tr></tr>
            </tfoot>
            <tbody>
            </tbody>
        </table>
    `);

	// Añadir los th al thead y tfoot basados en las columnas proporcionadas
	columns.forEach((col, index) => {
		// Añadir encabezado
		table.find('thead tr').append(`<th>${col.title}</th>`);

		// Añadir filtro en el pie de página
		if (col.filterType === 'select') {
			table.find('tfoot tr').append(`<th><select class="form-control column-filter" data-col-index="${index}"><option value="">Todos</option></select></th>`);
		} else if (col.filterType === 'input') {
			table.find('tfoot tr').append(`<th><input type="text" class="form-control" placeholder="Buscar ${col.title}" /></th>`);
		} else if (col.filterType === 'date') {
			table.find('tfoot tr').append(`<th><input type="text" class="form-control datepicker" placeholder="Seleccionar fecha" /></th>`);
		} else {
			table.find('tfoot tr').append('<th></th>');
		}
	});

	// Añadir la tabla al contenedor especificado
	$(containerSelector).html(table);

	// Opciones por defecto
	const defaultOptions = {
		paging: true,
		searching: true,
		ordering: true,
		info: true,
		autoWidth: false,
		language: {
			url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
		},
		columns: columns,
		initComplete: function() {
			const api = this.api();

			// Para cada columna con filtro de tipo select
			api.columns().every(function(colIdx) {
				const column = this;
				const colSettings = columns[colIdx];
				
				// Obtener el tipo de filtro de la columna actual
				const filterType = columns[colIdx].filterType;
				
				// Añadir funcionalidad a los filtros
				if (colSettings.filterType === 'select') {
					const select = $(`select[data-col-index='${colIdx}']`);
					const uniqueData = new Set();

					// Obtener los datos únicos de la columna
					column.data().unique().sort().each(function(d) {
						uniqueData.add(d);
					});

					// Si usas Ajax para cargar datos, asegúrate de esperar a que los datos estén cargados
					// y luego poblar los selects.

					// Añadir las opciones al select
					uniqueData.forEach(function(d) {
						select.append(`<option value="${d}">${d}</option>`);
					});

					// Inicializar Select2 en el select
					select.select2({
						placeholder: `Seleccionar ${colSettings.title}`,
						allowClear: true,
						width: '100%'
					});

					// Añadir evento para filtrar la columna al cambiar la selección
					select.on('change', function() {
						const val = $(this).val();
						if (val) {
							column.search(val).draw();
						} else {
							column.search('').draw();
						}
					});
				}else if (filterType === 'date') {
					// Inicializar el DatePicker en el input correspondiente
					$('input', this.footer()).datepicker({
						dateFormat: 'yy-mm-dd',
						onSelect: function(dateText) {
							// Filtrar la columna por la fecha seleccionada
							column.search(dateText).draw();
						},
						changeMonth: true,
						changeYear: true
					});
		
					// Añadir evento para limpiar el filtro al borrar el input
					$('input', this.footer()).on('keyup change clear', function() {
						if ($(this).val() === '') {
							column.search('').draw();
						}
					});
				} else if (filterType === 'input') {
					$('input', this.footer()).on('keyup change clear', function() {
						if (column.search() !== this.value) {
							column.search(this.value).draw();
						}
					});
				}
			});
		},
	};

	// Combina las opciones por defecto con las opciones proporcionadas
	const config = $.extend(true, {}, defaultOptions, options);

	// Inicializa el DataTable
	const dataTable = $(`#${tableId}`).DataTable(config);

	return dataTable;
}

