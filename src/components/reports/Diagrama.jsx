import React, { useRef, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import domtoimage from 'dom-to-image';
import ChartDataLabels from "chartjs-plugin-datalabels";




export const Diagrama = ({dataDiagrama={labels:[],datasets:[],name:''}}) => {
//   const setLoading = useStore(state => state.setLoading)

    // type 1 = bar 2 = pie
    const chart = useRef()
    const [typeBar, setTypeBar] = useState(true)
    Chart.register(CategoryScale, ChartDataLabels);
  

    const handleDownload = () => {
    //   setLoading(true)
    const chartNode = chart.current.canvas
    domtoimage.toPng(chartNode)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'mi-diagrama.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('Oops, hubo un error', error);
      })
    //   .finally(() => setLoading(false));
    }
    
  return (
    <div>
      <button className='btn btn-outline-secondary w-25' onClick={()=>setTypeBar(!typeBar)} >{typeBar ? 'Bar' : 'Pie'}</button>
      <button className='btn btn-outline-secondary px-3' onClick={handleDownload} >Descargar en png</button>
       
       <div className='d-flex justify-content-center align-items-center'>
        <div className='div-chart'>
         {
          typeBar && dataDiagrama ? (<Bar ref={chart} data={dataDiagrama} options={
            {
              plugins: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: dataDiagrama.name,
                },
                datalabels: {
                  display: 'auto',
                  color: 'black',
                  offset: 20,
                  align: 'center',
                  textAlign: 'center',
                  textStrokeColor: 'white',
                  textStrokeWidth: 1,
                  font: {
                    weight: 'bold',
                    size: 11,
                  },
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map((data) => {
                      sum += data;
                    });
                    let percentage = ((value * 100) / sum).toFixed(2) + "% \n - \n" + value;
                    return percentage;
                  },
                },
              },
            }
          } />):(<Pie ref={chart} data={dataDiagrama} options={
            {
              responsive: true,
              rotation: 90,
              plugins: {
                title: {
                  display: true,
                  text: dataDiagrama.name,
                },
                datalabels: {
                  display: 'auto',
                  color: 'black',
                  offset: 20,
                  align: 'center',
                  textAlign: 'center',
                  textStrokeColor: 'white',
                  textStrokeWidth: 1,
                  font: {
                    weight: 'bold',
                    size: 11
                  },
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map((data) => {
                      sum += data;
                    });
                    let percentage = ((value * 100) / sum).toFixed(2) + "% \n - \n " + value;
                    return percentage;
                  },
                },
              },
            }
          } />)
         }
        </div>
       </div>
       
    </div>
  )
}