import React from "react";
import MaterialTable from "material-table";

export default class Cases extends React.Component {
  render() {
    return (
      <MaterialTable
        title="Table"
        columns={[
          {
            title: "Country",
            field: "countryRegion"
          },
          { title: "Province/State", field: "provinceState" },
          { title: "Confirmed", field: "confirmed" },
          { title: "Recovered", field: "recovered" },
          { title: "Deaths", field: "deaths" },
          { title: "Active", field: "active" },
          { title: "LastUpdated", field: "lastUpdate" }
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            let url = "https://covid19.mathdro.id/api/confirmed";
            // url += "per_page=" + query.pageSize;
            // url += "&page=" + (query.page + 1);
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result,
                  totalCount: 282,
                  page: 0
                });
              });
          })
        }
      />
    );
  }
}
