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
    let totalPages = null;
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

    // Llamada a la función para agregar la imagen como encabezado en cada página
    doc.autoTable(columns, data.map(item => Object.values(item)), {
        startY: startY,
        didDrawPage: function (data) {
            // Check if there's enough space for the table, otherwise add a new page
            if (startY + data.tableHeight + 10 >= doc.internal.pageSize.height) {
                startY = 10; // Reset startY for the new page
                doc.addPage();
                addImageHeader(); // Agregar la imagen como encabezado en la nueva página
            }
        },
        addPageContent: function (data) {
            totalPages = doc.internal.getNumberOfPages(); // Obtener el número total de páginas
            const pageCount = totalPages;
            doc.setFontSize(10);
            doc.text('Página ' + pageCount + ' de ' + totalPages, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
    });

    addImageHeader(); // Agregar la imagen como encabezado en la primera página

    doc.output('dataurlnewwindow');
    const date = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
    doc.save(`${name}-${date}.pdf`);
};
