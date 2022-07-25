function isInside(p, [a, b]) {
    return (b[0] - a[0]) * (p[1] - a[1]) > (b[1] - a[1]) * (p[0] - a[0]);
}

function obtenerVertices(poligono) {
    let vertices = [];

    for (let i = 0; i < poligono.length; i++) {
        let vertice = [poligono[(i + poligono.length - 1) % poligono.length], poligono[i]];

        vertices.push(edge);
    }

    return vertices;
}


function interseccionLineas(linea0, linea1) {
    const
        [x1, y1] = linea0[0],
        [x2, y2] = linea0[1],
        [x3, y3] = linea1[0],
        [x4, y4] = linea1[1],
        denominador = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominador === 0) {
        // Línea paralela
        return false;
    }

    const
        numeradorX = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        numeradorY = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

    let x = numeradorX / denominador,
        y = numeradorY / denominador;


    return [x, y];
}


export default function (clipPolygon, subjectPolygon) {
    let result = subjectPolygon;
    obtenerVertices(clipPolygon).forEach((clipEdge) => {
        let pointList = result;
        result = [];

        obtenerVertices(pointList).forEach((pointEdge) => {
            if (isInside(pointEdge[1], clipEdge)) {
                if (!isInside(pointEdge[0], clipEdge)) {
                    result.push(interseccionLineas(pointEdge, clipEdge));
                }
                result.push(pointEdge[1]);
            } else if (isInside(pointEdge[0], clipEdge)) {
                result.push(interseccionLineas(pointEdge, clipEdge));
            }
        });
    });

    return result;
}