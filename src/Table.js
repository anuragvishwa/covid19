import React from "react";
import MaterialTable from "material-table";
import { readRemoteFile, CSVReader } from "react-papaparse";

export default class BasicFixedColumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
    this.updateData = this.updateData.bind(this);
  }

  updateData(result) {
    const data = result.data;
    this.setState({ data: data });
  }

  getHeader(data) {
    const columns = [];

    if (data) {
      const keys = Object.keys(data[0]);
      let i = 0;
      let firstcol, secondcol;
      for (const key of keys) {
        if (i == 0) {
          firstcol = { title: key, field: "col1", width: 120 };
        } else if (i == 1) {
          secondcol = {
            title: key,
            field: "col0",
            cellStyle: {
              backgroundColor: "#039be5",
              color: "#FFF"
            },
            headerStyle: {
              color: "#FFFFFF",
              backgroundColor: "#000000"
            },
            width: 120
          };
          columns.push(secondcol);
          columns.push(firstcol);
        } else {
          const col = { title: key, field: "col" + i, width: 120 };
          columns.push(col);
        }
        i++;
      }
    }
    return columns;
  }

  getTableData(data) {
    const rows = [];

    for (let myval of data) {
      const values = Object.values(myval);
      let columns = {};

      let j = 0;
      let firstVal, secondVal;
      for (let val of values) {
        if (j == 0) {
          firstVal = val;
        } else if (j == 1) {
          secondVal = val;
          columns["col0"] = secondVal;
          columns["col1"] = firstVal;
        } else {
          if (j != 2 && j != 3) {
            // var sum = 0;
            // var newarray = values[j].map(myFunction);
            // function myFunction(num) {
            //   return sum + num;
            // }
            // console.log(sum);
          }
          columns["col" + j] = val;
        }
        j++;
      }

      rows.push(columns);
    }

    return rows;
  }

  componentDidMount() {
    readRemoteFile(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
      {
        header: true,
        complete: this.updateData
      }
    );
  }

  render() {
    const columns = this.getHeader(this.state.data);
    const dataRows = this.getTableData(this.state.data);
    return (
      <MaterialTable
        title="Countries"
        columns={columns}
        data={dataRows}
        options={{
          fixedColumns: {
            left: 1
          },
          sorting: true,
          rowStyle: {
            backgroundColor: "#ddd"
          },
          headerStyle: {
            backgroundColor: "#039be5",
            color: "#FFF"
          }
        }}
      />
    );
  }
}
