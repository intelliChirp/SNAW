import React, {PureComponent} from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip,} from 'recharts';
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

// TODO:: Dynamically add data to graphs from json request Issue #7

function getTotals(classification_dict) {
    var anthro_total = 0;
    var bio_total = 0;
    var geo_total = 0;
    var non_total = 0;
    for(var i=0; i < classification_dict[0].data.length; i++) {
        if(classification_dict[0].data[i].category === "NO" &&
            classification_dict[1].data[i].category === "NO" &&
            classification_dict[2].data[i].category === "NO" ) {
            non_total += 1
        }
        else if(classification_dict[0].data[i].category !== "NO") {
            anthro_total += 1
        }
        if(classification_dict[1].data[i].category !== "NO") {
            bio_total += 1
        }
        if(classification_dict[2].data[i].category !== "NO") {
            geo_total += 1
        }
    }
    return [anthro_total, bio_total, geo_total, non_total]
}

var anthro_total = 0;
var bio_total = 0;
var geo_total = 0;
var pie_data = [
    { name : 'Anthrophony', value : anthro_total },
    { name : 'Biophony', value : bio_total },
    { name : 'Geophony', value : geo_total }
];

const ant_COLORS = ['#0088FE', '#FF8042'];
const bio_COLORS = ['#00C49F', '#FF8042'];
const geo_COLORS = ['#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  render() {

      var totals = getTotals( this.props.series );
      var anthro_total = totals[0];
      var bio_total = totals[1];
      var geo_total = totals[2];
      var none_total = totals[3];
      var total_len = this.props.series[0].data.length;

      var pie_data = [
          { name : 'Anthrophony', value : anthro_total },
          { name : 'Biophony', value : bio_total },
          { name : 'Geophony', value : geo_total },
            { name : 'None', value : none_total }
          ];

      var ant_pie_data = [
          { name : 'Anthrophony', value : anthro_total },
          { name : 'None', value : total_len - anthro_total }
      ];

      var bio_pie_data = [
          { name : 'Biophony', value : bio_total },
          { name : 'None', value : total_len - bio_total }
      ];

      var geo_pie_data = [
          { name : 'Geophony', value : geo_total },
          { name : 'None', value : total_len - geo_total }
      ];

    return (
        <Grid container spacing={3}>
            <Grid item>
                <PieChart width={250} height={250}>
                    <Pie
                      data={ant_pie_data}
                      cx={100}
                      cy={100}
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {
                        ant_pie_data.map((entry, index) => <Cell key={`cell-${index}`} fill={ant_COLORS[index % ant_COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </Grid>
            <Grid item>
                <PieChart width={250} height={250}>
                    <Pie
                        data={bio_pie_data}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {
                            bio_pie_data.map((entry, index) => <Cell key={`cell-${index}`} fill={bio_COLORS[index % bio_COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </Grid>
            <Grid item>
                <PieChart width={250} height={250}>
                    <Pie
                        data={geo_pie_data}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {
                            geo_pie_data.map((entry, index) => <Cell key={`cell-${index}`} fill={geo_COLORS[index % geo_COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </Grid>
        </Grid>
    );
  }
}
