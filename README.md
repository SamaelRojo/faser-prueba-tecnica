# Prueba técnica - Estudio Faser - David Elias
## Requerimientos
En este repositorio encontrarás un proyecto base Angular con elementos muy básicos. Dentro de `AppComponent` se encuentra una variable que contiene un listado de tareas. Debes realizar las modificaciones necesarias para obtener los siguientes resultados:
1. Cambiar el listado ordenado por una tabla HTML.
2. Agregar la opción para poder agregar nuevas tareas al listado, cada una con su título y duración en minutos.
3. Agregar la opción para eliminar cualquier tarea del listado.
4. Agregar un botón que permita ordenar el listado por el número de minutos que lleva cada tarea.
5. Agregar la opción para poder marcar una o varias tareas como destacadas. Las tareas destacadas deben tener un estilo que las distinga de las tareas normales.

## Solucion de Requerimientos
1. Se creo una tabla html simple con un ngFor.
2. Se creo un form con variables independientes para cada campo de la tarea con FormControls.
3. Se intero la lista de las tareas actuales y al encontrar la deseada, se elminaba de la lista.
4. Se implemento un ordenamiento BubbleSort para ordenar el arreglo de tareas, dependiente del numero de minutos de cada una.
5. Se agregaron dos variables extra a cada tarea para asi poder controlar cual tarea era importante y cual estaba seleccionada, dependiendo de cual estaba seleccionada se procedia a modificar la variable que controlaba cual tarea era importante.
