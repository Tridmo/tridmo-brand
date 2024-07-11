import { Box, Grid } from "@mui/material";
import RegistersChartComponent from "../../views/statistics/users/registers_chart";
import { CountsStats } from "../../views/statistics/counts_stats";
import TopLists from "../../views/statistics/top_lists";
import DownloadsChartComponent from "../../views/statistics/downloads/chart";
import TopListHeader from "../../views/statistics/top_list_header";
import InteriorsChartComponent from "../../views/statistics/interiors/chart";
import TagsChartComponent from "../../views/statistics/tags/chart";
import DownloadsAndTagsChartComponent from "../../views/statistics/downloads_and_tags.chart";

export default function Stats() {
  return (
    <Box sx={{ background: "#fafafa" }} className="products">
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
        <Grid container
          sx={{ margin: "32px 0 120px 0" }}
          rowGap={2}
        >
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <CountsStats />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <DownloadsAndTagsChartComponent />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <TopListHeader />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <TopLists />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}