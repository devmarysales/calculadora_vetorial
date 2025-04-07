function calcular() {
    const ax = parseFloat(document.getElementById("ax").value);
    const ay = parseFloat(document.getElementById("ay").value);
    const az = parseFloat(document.getElementById("az").value);
    const bx = parseFloat(document.getElementById("bx").value);
    const by = parseFloat(document.getElementById("by").value);
    const bz = parseFloat(document.getElementById("bz").value);
  
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;
  
    const areaParalelogramo = Math.sqrt(cx ** 2 + cy ** 2 + cz ** 2);
    const areaTriangulo = areaParalelogramo / 2;
  
    document.getElementById("resultado").innerHTML = `
      <h2>Resultado</h2>
      <p><strong>Produto Vetorial (A × B):</strong> (${cx.toFixed(2)}, ${cy.toFixed(2)}, ${cz.toFixed(2)})</p>
      <p><strong>Área do Paralelogramo:</strong> ${areaParalelogramo.toFixed(2)}</p>
      <p><strong>Área do Triângulo:</strong> ${areaTriangulo.toFixed(2)}</p>
    `;
  
    const A = [ax, ay, az];
    const B = [bx, by, bz];
    const AB = [ax + bx, ay + by, az + bz];
  
    // GRAFICO 3D
    const vetorA = {
      type: 'scatter3d',
      mode: 'lines',
      name: 'Vetor A',
      line: { width: 6 },
      x: [0, ax],
      y: [0, ay],
      z: [0, az]
    };
  
    const vetorB = {
      type: 'scatter3d',
      mode: 'lines',
      name: 'Vetor B',
      line: { width: 6 },
      x: [0, bx],
      y: [0, by],
      z: [0, bz]
    };
  
    const vetorC = {
      type: 'scatter3d',
      mode: 'lines',
      name: 'A × B (Normal)',
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
      x: [0, ax, AB[0], bx],
      y: [0, ay, AB[1], by],
      z: [0, az, AB[2], bz],
      i: [0, 1, 2, 0],
      j: [1, 2, 3, 3],
      k: [2, 3, 0, 1]
    };
  
    const textos = {
      type: 'scatter3d',
      mode: 'text',
      text: [
        `Área do Paralelogramo: ${areaParalelogramo.toFixed(2)}`,
        `Área do Triângulo: ${areaTriangulo.toFixed(2)}`
      ],
      textposition: "top center",
      textfont: {
        size: 14,
        color: 'black'
      },
      x: [AB[0] / 2, AB[0] / 3],
      y: [AB[1] / 2, AB[1] / 3],
      z: [AB[2] / 2, AB[2] / 3],
      name: 'Áreas'
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
  
    Plotly.newPlot('grafico', [vetorA, vetorB, vetorC, paralelogramo, textos], layout3D);
  
    //  GRÁFICO 2D
    const vetorA2D = {
      type: 'scatter',
      mode: 'lines+markers+text',
      name: 'Vetor A (2D)',
      x: [0, ax],
      y: [0, ay],
      marker: { size: 6 },
      line: { width: 4 },
      text: ['O', 'A'],
      textposition: 'top center'
    };
  
    const vetorB2D = {
      type: 'scatter',
      mode: 'lines+markers+text',
      name: 'Vetor B (2D)',
      x: [0, bx],
      y: [0, by],
      marker: { size: 6 },
      line: { width: 4 },
      text: ['O', 'B'],
      textposition: 'top center'
    };
  
    const paralelogramo2D = {
      type: 'scatter',
      mode: 'lines',
      name: 'Paralelogramo (2D)',
      fill: 'toself',
      fillcolor: 'rgba(255,165,0,0.3)',
      line: { width: 1 },
      x: [0, ax, AB[0], bx, 0],
      y: [0, ay, AB[1], by, 0],
      showlegend: true
    };
  
    const layout2D = {
      title: 'Projeção no Plano XY',
      xaxis: { title: 'X', zeroline: true },
      yaxis: { title: 'Y', zeroline: true },
      showlegend: true
    };
  
    Plotly.newPlot('grafico2d', [paralelogramo2D, vetorA2D, vetorB2D], layout2D);
  }
  