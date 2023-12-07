import { BetaAnalyticsDataClient } from "@google-analytics/data";
import axios from "axios";
import ExcelJS from "exceljs";
import { format } from "date-fns";

const analyticsDataClient = new BetaAnalyticsDataClient();
const HOST = process.env.HOST_SERVER || "http://localhost:8080";

export async function runReport(req, res) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/416413446`,
      dateRanges: [
        {
          startDate: "2023-12-01",
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
          name: "screenPageViews",
        },
      ],
    });
    // Get data contact from Analytics
    const [contact] = await analyticsDataClient.runReport({
      property: `properties/416413446`,
      dateRanges: [
        {
          startDate: "2023-12-01",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "eventName",
        },
        {
          name: "pagePath",
        },
      ],
      metrics: [
        {
          name: "eventCount",
        },
      ],
    });

    // Filter to get data contact
    const FilterContact = await Promise.all(
      contact.rows
        .filter((item) => item.dimensionValues[0].value === "contact")
        .map((item) => ({
          path: item.dimensionValues[1].value,
          eventCount: item.metricValues[0].value,
        }))
        .map(async (item) => {
          const product_id = item.path.split("/").pop();
          const productData = await axios.get(
            `${HOST}/api/products/get-product?product_id=${product_id}`
          );
          return {
            name: productData.data.data.name,
            product_name: productData.data.data.product_name,
            accessValue: item.eventCount,
          };
        })
    );
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
    const transformedData = await Promise.all(
      data
        .filter((item) => item.path.startsWith("/detail"))
        .map(async (item) => {
          const product_id = item.path.split("/").pop();
          const productData = await axios.get(
            `${HOST}/api/products/get-product?product_id=${product_id}`
          );
          return {
            name: productData.data.data.name,
            product_name: productData.data.data.product_name,
            accessValue: item.accessValue,
          };
        })
    );
    // Excel processing
    // Using ExcelJS to read ReportForm.xlsx
    // Using File-saver to save as file for export report file depent on transformedData
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx
      .readFile("ReportForm.xlsx")
      .then(function () {
        //Transfer data to excel file
        const worksheet = workbook.getWorksheet("Sheet1");

        //Transfer Time
        worksheet.getCell("B4").value = `Thời gian: 01/10/2023 - ${format(
          new Date().getTime(),
          "dd/MM/yyyy"
        )}`;

        //Transfer Homepage accessing value
        worksheet.getCell("C6").value = data.find(
          (item) => item.path === "/"
        ).accessValue;
        worksheet.getCell("C6").font = { bold: true };
        worksheet.getCell("C6").alignment = { horizontal: "center" };

        //Transfer Product accessing value
        transformedData.forEach((item, index) => {
          const cols = ["B", "C", "D"];
          cols.forEach((col) => {
            const cell = worksheet.getCell(`${col}${index + 9}`);
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
            switch (col) {
              case "B":
                cell.value = item.name;
                cell.alignment = { horizontal: "center" };
                break;
              case "C":
                cell.value = item.product_name;
                break;
              case "D":
                cell.value = item.accessValue;
                cell.alignment = { horizontal: "center" };
                break;
            }
          });
        });
        // Add Title contact
        worksheet.getCell("B" + (transformedData.length + 10)).value =
          "3. Lượt người dùng Liên hệ doanh nghiệp:";
        worksheet.getCell("B" + (transformedData.length + 10)).font = {
          name: "Times New Roman",
          bold: true,
        };
        function setCellProperties(cell, value) {
          cell.value = value;
          cell.font = { name: "Times New Roman", bold: true };
          cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
          cell.alignment = { horizontal: "center" };
        }
        
        const baseRow = transformedData.length + 11;
        
        setCellProperties(worksheet.getCell("B" + baseRow), "Doanh nghiệp");
        setCellProperties(worksheet.getCell("C" + baseRow), "Sản phẩm");
        setCellProperties(worksheet.getCell("D" + baseRow), "Số lượng liên hệ");
        // Transfer Contact accessing value
        FilterContact.forEach((item, index) => {
          const cols = ["B", "C", "D"];
          cols.forEach((col) => {
            const cell = worksheet.getCell(`${col}${index + 12 + transformedData.length}`);
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
            switch (col) {
              case "B":
                cell.value = item.name;
                cell.alignment = { horizontal: "center" };
                break;
              case "C":
                cell.value = item.product_name;
                break;
              case "D":
                cell.value = item.accessValue;
                cell.alignment = { horizontal: "center" };
                break;
            }
          });
        });

        let maxLength = 0;
        worksheet
          .getColumn("C")
        ["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        worksheet.getColumn("C").width = maxLength < 10 ? 10 : maxLength;
      })
      .then(() => {
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=Report_" +
          format(new Date().getTime(), "dd/MM/yyyy") +
          ".xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
          res.status(200).end();
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
}
