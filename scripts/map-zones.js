const img = document.querySelector(".map-image");
const lake = document.querySelector(".lake");
const ctx = lake.getContext("2d");


if (img.complete) {
  resizeCanvas();
} else {
  img.onload = resizeCanvas;
}

    function resizeCanvas() {
      lake.width = img.clientWidth;
      lake.height = img.clientHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    img.onload = resizeCanvas;

    const zones = [
    {
        name: "pier",
        points: [[0.675, 0.264], [0.583, 0.325], [0.636, 0.383], [0.723, 0.314]],
        forbidden: true
    },
    {
        name: "boat",
        points: [[0.757, 0.704], [0.715, 0.649], [0.663, 0.610], [0.638, 0.630], [0.656, 0.701], [0.674, 0.730], [0.707, 0.766], [0.735, 0.742]],
        forbidden: true
    },
    {
        name: "zone1",
        points: [[0.225, 0.470], [0.258, 0.375], [0.310, 0.312], [0.339, 0.289], [0.414, 0.252], [0.486, 0.225], [0.508, 0.263], [0.491, 0.367], [0.407, 0.450], [0.315, 0.459]],
        forbidden: false,
        color: "rgba(0, 102, 255, 0.4)"
    },
    {
        name: "zone2",
        points: [[0.491, 0.369], [0.508, 0.264],[0.488, 0.226], [0.490, 0.225],[0.566, 0.233], [0.608, 0.249], [0.614, 0.254], [0.649, 0.279], [0.582, 0.325], [0.635, 0.383], [0.612, 0.456], [0.527, 0.399]],
        forbidden: false, 
        color: "rgba(0, 204, 255, 0.4)"
    },
    {
        name: "zone3",
        points: [[0.635, 0.385], [0.705, 0.329], [0.745, 0.369], [0.785, 0.461], [0.790, 0.476], [0.798, 0.534], [0.800, 0.572], [0.789, 0.624], [0.775, 0.663], [0.755, 0.701], [0.717, 0.650], [0.663, 0.610], [0.588, 0.573], [0.612, 0.458]],
        forbidden: false,
        color: "rgba(0, 255, 255, 0.4)"
    },
    {
        name: "zone4",
        points: [[0.661, 0.610], [0.637, 0.630], [0.655, 0.703], [0.702, 0.766], [0.575, 0.839], [0.471, 0.854], [0.472, 0.845], [0.486, 0.716], [0.530, 0.611], [0.587, 0.574]],
        forbidden: false,
        color: "rgba(0, 255, 102, 0.4)"
    },
    {
        name: "zone5",
        points: [[0.470, 0.854], [0.362, 0.801], [0.273, 0.702], [0.347, 0.609], [0.441, 0.551], [0.527, 0.612], [0.528, 0.614], [0.485, 0.718]],
        forbidden: false,
        color: "rgba(102, 255, 0, 0.4)"
    },
    {
        name: "zone6",
        points: [[0.440, 0.551], [0.346, 0.609], [0.272, 0.702], [0.243, 0.654], [0.230, 0.617], [0.222, 0.573], [0.221, 0.522], [0.222, 0.499], [0.225, 0.471], [0.407, 0.452]],
        forbidden: false,
        color: "rgba(204, 255, 0, 0.4)"
    
    },
    {
        name: "zone7",
        points: [[0.529, 0.613], [0.528, 0.610], [0.587, 0.572], [0.611, 0.458], [0.524, 0.397], [0.489, 0.369], [0.407, 0.450], [0.440, 0.550], [0.527, 0.610],],
        forbidden: false,
        color: "rgba(174, 0, 255, 0.4)"
    },
    {
        name: "lake-zone",
        points: [],   
        forbidden: false,
        color: "rgba(255, 238, 0, 1)"
    }
    
];

    function isPointInPolygon(x, y, polygon) {
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect = ((yi > y) !== (yj > y)) &&
                          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

        lake.addEventListener("click", (event) => {
        const rect = lake.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (const zone of zones) {
            // масштабируем %
            const polygon = zone.points.map(p => [p[0] * lake.width, p[1] * lake.height]);
            if (isPointInPolygon(x, y, polygon)) {
            if (zone.forbidden) {
                console.log("❌ Клик запрещён в зоне:", zone.name);
            } else {
                console.log("✅ Клик в зоне:", zone.name);
            }
            return;
            }
        }
        console.log("Клик вне зон");
        });


    // Включить pointer-events для canvas, чтобы ловить клики
    lake.style.pointerEvents = "auto";

function drawZones() {
  ctx.clearRect(0, 0, lake.width, lake.height);
  zones.forEach(zone => {
    const polygon = zone.points.map(p => [p[0] * lake.width, p[1] * lake.height]);
    ctx.beginPath();
    polygon.forEach(([px, py], i) => {
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = zone.color || (zone.forbidden ? "rgba(255, 0, 0, 0.59)" : "rgba(0,255,0,0.4)");
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  });
}


window.addEventListener("resize", () => {
  resizeCanvas();
  drawZones();
});
img.onload = () => {
  resizeCanvas();
  drawZones();
};

lake.addEventListener("click", (event) => {
  const rect = lake.getBoundingClientRect();
  const x = (event.clientX - rect.left) / lake.width;
  const y = (event.clientY - rect.top) / lake.height;

  console.log(`[${x.toFixed(3)}, ${y.toFixed(3)}],`);
});