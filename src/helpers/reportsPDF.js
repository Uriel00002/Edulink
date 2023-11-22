/* eslint-disable array-callback-return */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import imgLogo from '../assets/img/logo.png';

export const generatePDF = (data, name) => {
    if(!data) return;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    });

    let startY = 30;
    let totalPages = 0;
    const columns = Object.keys(data[0]).map(key => key.toUpperCase());

    // Cargar tu imagen como un objeto Image
    const img = new Image();
    img.width = 20;
    img.src = imgLogo;

    // Función para dibujar la imagen como encabezado en cada página
    const addImageHeader = () => {
        const imgWidth = 95; // Ancho de la imagen
        const imgHeight = 20; // Alto de la imagen
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // Agregar la imagen como encabezado
    };

    addImageHeader();

    const formatedData = () => {
        return data.map(item => {
            return Object.values(item).map(value => {
                if (typeof value === 'object') {
                    return value.map(subValue => {
                        if(typeof subValue === 'object') {
                            return `${subValue.teacher}->${subValue.subject}\n`;
                        } else {
                            return subValue;
                        }
                    });
                } else {
                    return value;
                }
            });
        });
    };

    // Llamada a la función para agregar la imagen como encabezado en cada página
    doc.autoTable(columns, formatedData(), {
        startY: startY,
        headStyles: { fillColor: [0, 0, 0], halign: 'center', textColor: [255, 255, 255] },
        bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        styles: {
            lineColor: [0, 0, 0], // Color del borde de la celda
            lineWidth: 0.2, // Ancho del borde de la celda
        },
        didDrawPage: function (data) {
            // Check if there's enough space for the table, otherwise add a new page
            if (startY + data.tableHeight + 10 >= doc.internal.pageSize.height) {
                startY = 10; // Reset startY for the new page
                doc.addPage();
                addImageHeader(); // Agregar la imagen como encabezado en la nueva página
            }
        },
        addPageContent: function (data){
            const pageNumber = data.pageNumber;
            if (totalPages === 0) {
                totalPages = doc.internal.pages.length;
            }
            doc.setFontSize(10);
            doc.text('Página ' + pageNumber + ' de ' + totalPages, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
    });


    doc.output('dataurlnewwindow');
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    doc.save(`${name}-${date}.pdf`);
};

export const generatePDFSchedule = (data, name, academic_charge) => {
    if(!data) return;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    });

    let startY = 15;
    let totalPages = 0;
    const dias = ['','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const horas = ['7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20'];

    // Cargar tu imagen como un objeto Image
    const img = new Image();
    img.width = 20;
    img.src = imgLogo;

    // Función para dibujar la imagen como encabezado en cada página
    const addImageHeader = () => {
        const imgWidth = 95; // Ancho de la imagen
        const imgHeight = 20; // Alto de la imagen
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // Agregar la imagen como encabezado
    };

    // addImageHeader();

    const formatedData = () => {
        const formatted = [];

        horas.forEach((hora, indexH) => {
            const rowData = [parseInt(hora.split('-')[0]) < 11 ? hora + ' am' : hora + ' pm'];
            dias.forEach((dia, indexD) => {
            try {
                rowData.push(
                    data[indexD][indexH].teacher + '\n'+
                    data[indexD][indexH].subject + '\n'+
                    data[indexD][indexH].classroom
                );
            } catch (error) {
                rowData.push('');
            }
            });
            formatted.push(rowData);
        });

        return formatted;
    };

    doc.text(academic_charge.toString(), 10, 10);
    // Llamada a la función para agregar la imagen como encabezado en cada página
    doc.autoTable(dias, formatedData(), {
        startY: startY,
        headStyles: { fillColor: [0, 0, 0], halign: 'center', textColor: [255, 255, 255] },
        bodyStyles: { 
            fillColor: [255, 255, 255], 
            halign: 'center', 
            textColor: [0, 0, 0] ,
            fontSize: 8
        },
        styles: {
            lineColor: [0, 0, 0], // Color del borde de la celda
            lineWidth: 0.2, // Ancho del borde de la celda
        },
        didDrawPage: function (data) {
            // Check if there's enough space for the table, otherwise add a new page
            if (startY + data.tableHeight + 10 >= doc.internal.pageSize.height) {
                startY = 10; // Reset startY for the new page
                doc.addPage();
                addImageHeader(); // Agregar la imagen como encabezado en la nueva página
            }
        },
        addPageContent: function (data){
            const pageNumber = data.pageNumber;
            if (totalPages === 0) {
                totalPages = doc.internal.pages.length;
            }
            doc.setFontSize(10);
            // doc.text('Página ' + pageNumber + ' de ' + totalPages, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
    });

    doc.output('dataurlnewwindow');
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    doc.save(`${name}-${date}.pdf`);
}