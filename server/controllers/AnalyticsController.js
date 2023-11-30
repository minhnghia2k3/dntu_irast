import { BetaAnalyticsDataClient } from "@google-analytics/data";
import axios from 'axios';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { compareAsc, format } from 'date-fns'

const analyticsDataClient = new BetaAnalyticsDataClient();
const HOST = process.env.HOST_SERVER || "http://localhost:8080";

export async function runReport(req, res) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/416413446`,
      dateRanges: [
        {
          startDate: "2020-03-31",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "pagePath",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
      ],
    });

    //That data property will get data all of path responed from Analytics to filter and format data like:
    //{ path: '/path', accessValue: 'Access value' }
    const data = response.rows
      .filter(
        (item) =>
          item.dimensionValues.length === 1 &&
          !item.dimensionValues[0].value.includes("video") &&
          !item.dimensionValues[0].value.includes("undefined") &&
          !item.dimensionValues[0].value.includes("logout") &&
          !item.dimensionValues[0].value.includes("admin")
      )
      .map((item) => ({
        path: item.dimensionValues[0].value,
        accessValue: item.metricValues[0].value,
      }));

    // transformedData will receive Data from data
    // to return data have format like:
    // {
    //   "name": "Company Name",
    //   "product_name": "Product Name",
    //   "accessValue": "Access value"
    // }
    const transformedData = await Promise.all(data
      .filter(item => item.path.startsWith('/detail'))
      .map(async (item) => {
        const product_id = item.path.split('/').pop();
        const productData = await axios.get(`${HOST}/api/products/get-product?product_id=${product_id}`);
        return {
          name: productData.data.data.name,
          product_name: productData.data.data.product_name,
          accessValue: item.accessValue,
        };
      }));
    // Excel processing
    // Using ExcelJS to read ReportForm.xlsx
    // Using File-saver to save as file for export report file depent on transformedData 
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile('ReportForm.xlsx')
      .then(function () {
        //Transfer data to excel file
        const worksheet = workbook.getWorksheet('Sheet1');
        transformedData.forEach((item, index) => {
          const cols = ['B', 'C', 'D'];
          cols.forEach(col => {
            switch (col) {
              case 'B':
                worksheet.getCell(`${col}${index + 9}`).value = item.name;
                break;
              case 'C':
                worksheet.getCell(`${col}${index + 9}`).value = item.product_name;
                break;
              case 'D':
                worksheet.getCell(`${col}${index + 9}`).value = item.accessValue;
                break;
            }
          })
        });
      })
      .then(() => {
        res.setHeader("Content-Disposition", "attachment; filename=Repot_" + format(new Date().getTime(), 'dd/MM/yyyy') + ".xlsx");
        return workbook.xlsx.write(res).then(function () {
          res.status(200).end();
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
}
