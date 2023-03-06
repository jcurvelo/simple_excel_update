const express = require('express');
const xlsx = require('xlsx');
const app = express();

app.get('/', (req, res) => {
    //  Leer el primer libro
    const workbook = xlsx.readFile('Libro1.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    //  Leer el segundo libro
    const workbook2 = xlsx.readFile('Libro2.xlsx');
    const sheet_name_list2 = workbook2.SheetNames;
    const xlData2 = xlsx.utils.sheet_to_json(workbook2.Sheets[sheet_name_list2[0]]);

    // Actualizar el primer libro con los datos del segundo si el Id es igual
    const updatedData = xlData.map((item) => {
        const updatedItem = xlData2.find((item2) => item2.id === item.id);
        console.log(updatedItem);
        return updatedItem ? updatedItem : item;
    });


    //  Escribir el primer libro con los datos actualizados
    const newWB = xlsx.utils.book_new();
    const newWS = xlsx.utils.json_to_sheet(updatedData);
    xlsx.utils.book_append_sheet(newWB, newWS, 'Sheet1');
    xlsx.writeFile(newWB, 'Libro Actualizado.xlsx');
    
    res.send(updatedData);
});

app.listen(3000, () => {
    console.log('Servidor inicio en puerto 3000');
});