"input-item-number";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { Button } from "@mui/material";
import { series } from "./Data";
import { axisClasses } from "@mui/x-charts";

import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";

export default function BarAnimation() {
  const [seriesNb, setSeriesNb] = React.useState(1);
  const [itemNb, setItemNb] = React.useState(9);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  //       const handleSeriesNbChange = (event, newValue) => {
  //         if (typeof newValue !== "number") {
  //           return;
  //         }
  //     setSeriesNb(newValue);
  //   };

  //   const [seriesNb, setSeriesNb] = useState(1);

  const handleIncrement = () => {
    if (seriesNb < 10) {
      setSeriesNb(seriesNb + 2);
    }
  };

  const handleDecrement = () => {
    if (seriesNb > 1) {
      setSeriesNb(seriesNb - 1);
    }
  };

  const chartSetting = {
    yAxis: [{ label: "Total Number" }],
    height: 300,
    // margin:"6rem",
  };

  return (
    <Box sx={{ width: "auto", margin: "3rem" }}>
      <BarChart
        height={300}
        margin={{ left: 90 }}
        // xAxis={[
        //   {
        //     data: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
        //     scaleType: "band",
        //   },
        // ]}
        series={series.slice(0, seriesNb).map((s) => ({
          ...s,
          data: s.data.slice(0, itemNb),
        }))}
        skipAnimation={skipAnimation}
        grid={{ horizontal: true }}
        sx={{
          fontWeight: "900",
          [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translateX(-3rem)",
          },
          [`& .${chartsGridClasses.line}`]: {
            strokeDasharray: "5 3",
            strokeWidth: 2,
          },
        }}
        {...chartSetting}
      />

      <FormControlLabel
        checked={skipAnimation}
        control={
          <Checkbox
            onChange={(event) => setSkipAnimation(event.target.checked)}
          />
        }
        label="Skip Animation"
        labelPlacement="end"
      />
      <Typography
        sx={{ fontWeight: "900" }}
        id="input-item-number"
        gutterBottom
      >
        Add More Data Set
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={20}
        aria-labelledby="input-item-number"
      />
      <Typography
        sx={{ fontWeight: "900" }}
        id="input-series-number"
        gutterBottom
      >
        Number of series
      </Typography>
      {/* <Slider
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={10}
        aria-labelledby="input-series-number"
      /> */}
      <Button onClick={handleDecrement} value={seriesNb[3]} variant="contained">
        -
      </Button>
      <span style={{ margin: " 0  1em  0  1rem " }}>{seriesNb}</span>
      <Button onClick={handleIncrement} variant="contained">
        +
      </Button>
    </Box>
  );
}

const highlightScope = {
  highlighted: "series",
  faded: "global",
};

series.map((s) => ({ ...s, highlightScope }));
