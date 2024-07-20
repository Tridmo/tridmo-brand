import { Box, Grid, makeStyles } from "@mui/material";
import RegistersChartComponent from "../../views/statistics/users/registers_chart";
import { CountsStats } from "../../views/statistics/counts_stats";
import TopLists from "../../views/statistics/top_lists";
import DownloadsChartComponent from "../../views/statistics/downloads/chart";
import TopListHeader from "../../views/statistics/top_list_header";
import InteriorsChartComponent from "../../views/statistics/interiors/chart";
import TagsChartComponent from "../../views/statistics/tags/chart";
import DownloadsAndTagsChartComponent from "../../views/statistics/downloads_and_tags.chart";
import CategoriesCountsChartComponent from "../../views/statistics/categories/counts_chart";
import { setRouteCrumbs } from "../../../data/route_crumbs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


export default function Stats() {

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(setRouteCrumbs([{
      title: 'Статистика',
      route: '/stats'
    }]))
  }, [])

  return (
    <Box sx={{ background: "#fafafa" }} className="products">
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
        <Grid container
          sx={{ margin: "32px 0 120px 0" }}
          rowGap={2}
          alignItems={'stretch'}
        >
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <CountsStats />
          </Grid>
          <Grid item alignItems={'stretch'} xs={12} md={12} lg={12} sm={12}>
            <Grid container gap={2} alignItems={'stretch'}>
              <Grid item alignItems={'stretch'} xs={true} md={true} lg={true} sm={true}>
                <DownloadsAndTagsChartComponent />
              </Grid>
              <Grid item xs={true} md={true} lg={true} sm={true}>
                <CategoriesCountsChartComponent />
              </Grid>
            </Grid>
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