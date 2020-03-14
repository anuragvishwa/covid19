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
        // console.log(key);
        if (i == 0) {
          firstcol = { title: key, field: "col" + i++, width: 150 };
          continue;
        }
        if (i == 1) {
          secondcol = { title: key, field: "col" + i++, width: 150 };
          columns.push(secondcol);
          columns.push(firstcol);
          continue;
        }
        const col = { title: key, field: "col" + i++, width: 150 };
        columns.push(col);
      }
    }
    return columns;
  }

  getTableData(data) {
    const rows = [];
    const columns = [];

    for (let myval of data) {
      const values = Object.values(myval);
      //console.log(values);
      let i = 0;
      let j = 0;
      let firstcol, secondcol;
      for (let val of values) {
        // console.log("Are you inside?");
        if (j == 0) {
          let firstcol = {};
          firstcol["col" + i++] = val;
          // firstcol = { "col"+i++: val, field: "row" + i++ + j++, width: 150 };
          continue;
        }
        if (j == 1) {
          let secondcol = {};
          secondcol["col" + i++] = val;
          columns.push(secondcol);
          columns.push(firstcol);
          continue;
        }
        j++;
        console.log(firstcol, secondcol);

        let col = {};
        col["col" + i++] = val;
        console.log("anurag");
        columns.push(col);
      }
    }

    return columns;
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
        title="Countries Affected"
        columns={columns}
        data={dataRows}
        options={{
          fixedColumns: {
            left: 1
          }
        }}
      />
    );
  }
}
