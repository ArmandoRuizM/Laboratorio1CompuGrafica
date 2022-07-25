function isInside(p, [a, b]) {
    return (b[0] - a[0]) * (p[1] - a[1]) > (b[1] - a[1]) * (p[0] - a[0]);
}

function getEdges(polygon) {
    let edges = [];

    for (let i = 0; i < polygon.length; i++) {
        let edge = [polygon[(i + polygon.length - 1) % polygon.length], polygon[i]];

        edges.push(edge);
    }

    return edges;
}


function lineIntersection(line0, line1) {
    const
        [x1, y1] = line0[0],
        [x2, y2] = line0[1],
        [x3, y3] = line1[0],
        [x4, y4] = line1[1],
        denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) {
        // Línea paralela
        return false;
    }

    const
        numeratorX = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        numeratorY = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

    let x = numeratorX / denominator,
        y = numeratorY / denominator;


    return [x, y];
}


export default function (clipPolygon, subjectPolygon) {
    let result = subjectPolygon;
    getEdges(clipPolygon).forEach((clipEdge) => {
        let pointList = result;
        result = [];

        getEdges(pointList).forEach((pointEdge) => {
            if (isInside(pointEdge[1], clipEdge)) {
                if (!isInside(pointEdge[0], clipEdge)) {
                    result.push(lineIntersection(pointEdge, clipEdge));
                }
                result.push(pointEdge[1]);
            } else if (isInside(pointEdge[0], clipEdge)) {
                result.push(lineIntersection(pointEdge, clipEdge));
            }
        });
    });

    return result;
}