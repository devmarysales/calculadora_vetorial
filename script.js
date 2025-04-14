function calcular() {
  const ux = parseFloat(document.getElementById("ux").value);
  const uy = parseFloat(document.getElementById("uy").value);
  const uz = parseFloat(document.getElementById("uz").value);
  const vx = parseFloat(document.getElementById("vx").value);
  const vy = parseFloat(document.getElementById("vy").value);
  const vz = parseFloat(document.getElementById("vz").value);

  const cx = uy * vz - uz * vy;
  const cy = uz * vx - ux * vz;
  const cz = ux * vy - uy * vx;

  const areaParalelogramo = Math.sqrt(cx ** 2 + cy ** 2 + cz ** 2);
  const areaTriangulo = areaParalelogramo / 2;

  document.getElementById("resultado").innerHTML = `
    <h2>Resultado</h2>
    <p><strong>Produto Vetorial (u × v):</strong> (${cx.toFixed(2)}, ${cy.toFixed(2)}, ${cz.toFixed(2)})</p>
    
    <h3>Passo a Passo:</h3>
    <pre>
u = (${ux}, ${uy}, ${uz})
v = (${vx}, ${vy}, ${vz})

u × v = (uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx)
      = (${uy} * ${vz} - ${uz} * ${vy}, ${uz} * ${vx} - ${ux} * ${vz}, ${ux} * ${vy} - ${uy} * ${vx})
      = (${cx.toFixed(2)}, ${cy.toFixed(2)}, ${cz.toFixed(2)})

Área do Paralelogramo = √(cx² + cy² + cz²)
                      = √(${cx.toFixed(2)}² + ${cy.toFixed(2)}² + ${cz.toFixed(2)}²)
                      = ${areaParalelogramo.toFixed(2)}

Área do Triângulo = Área do Paralelogramo / 2
                  = ${areaParalelogramo.toFixed(2)} / 2
                  = ${areaTriangulo.toFixed(2)}
    </pre>
  `;

  const AB = [ux + vx, uy + vy, uz + vz];

  const vetorU = {
    type: 'scatter3d',
    mode: 'lines',
    name: 'Vetor u',
    line: { width: 6 },
    x: [0, ux],
    y: [0, uy],
    z: [0, uz]
  };

  const vetorV = {
    type: 'scatter3d',
    mode: 'lines',
    name: 'Vetor v',
    line: { width: 6 },
    x: [0, vx],
    y: [0, vy],
    z: [0, vz]
  };

  const vetorNormal = {
    type: 'scatter3d',
    mode: 'lines',
    name: 'u × v (Normal)',
    line: { width: 4, dash: 'dot' },
    x: [0, cx],
    y: [0, cy],
    z: [0, cz]
  };

  const paralelogramo = {
    type: 'mesh3d',
    name: 'Paralelogramo',
    opacity: 0.4,
    color: 'orange',
    x: [0, ux, AB[0], vx],
    y: [0, uy, AB[1], vy],
    z: [0, uz, AB[2], vz],
    i: [0, 1, 2, 0],
    j: [1, 2, 3, 3],
    k: [2, 3, 0, 1]
  };

  const layout3D = {
    margin: { t: 0 },
    scene: {
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' },
      zaxis: { title: 'Z' }
    },
    showlegend: true
  };

  Plotly.newPlot('grafico', [vetorU, vetorV, vetorNormal, paralelogramo], layout3D);

  const vetorU2D = {
    type: 'scatter',
    mode: 'lines+markers+text',
    name: 'Vetor u (2D)',
    x: [0, ux],
    y: [0, uy],
    marker: { size: 6 },
    line: { width: 4 },
    text: ['O', 'u'],
    textposition: 'top center'
  };

  const vetorV2D = {
    type: 'scatter',
    mode: 'lines+markers+text',
    name: 'Vetor v (2D)',
    x: [0, vx],
    y: [0, vy],
    marker: { size: 6 },
    line: { width: 4 },
    text: ['O', 'v'],
    textposition: 'top center'
  };

  const paralelogramo2D = {
    type: 'scatter',
    mode: 'lines',
    name: 'Paralelogramo (2D)',
    fill: 'toself',
    fillcolor: 'rgba(255,165,0,0.3)',
    line: { width: 1 },
    x: [0, ux, AB[0], vx, 0],
    y: [0, uy, AB[1], vy, 0],
    showlegend: true
  };

  const layout2D = {
    title: 'Projeção no Plano XY',
    xaxis: { title: 'X', zeroline: true },
    yaxis: { title: 'Y', zeroline: true },
    showlegend: true
  };

  Plotly.newPlot('grafico2d', [paralelogramo2D, vetorU2D, vetorV2D], layout2D);
}
