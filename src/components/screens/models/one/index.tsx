"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import ProductSlider from '../../../views/model/slider';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import ProductModal from '../../../views/model/model_modal';
import { concatRouteCrumb, setRouteCrumbs } from '../../../../data/route_crumbs';
import { selectOneModel } from '../../../../data/model_slider';
import { usePathname } from 'next/navigation';
import ModelInteriorsList from '../../../views/model/model_interiors_list';
import DownloadsAndTagsChartComponent from '../../../views/statistics/downloads_and_tags.chart';
import ModelInteriorsGrid from '../../../views/model/model_interiors_grid';
import ModelDownloadsAndTagsChartComponent from '../../../views/statistics/models/one_model_downloads_and_tags.chart';
import ModelDownloadersList from '../../../views/statistics/models/one_model_downloaders_list';


export default function OneModel() {
  const model = (useSelector(selectOneModel))?.data?.model;
  const dispatch = useDispatch()
  const pathname = usePathname()

  React.useEffect(() => {
    if (model) {
      dispatch(setRouteCrumbs(
        [{
          title: 'Модели',
          route: '/models'
        }, {
          title: model?.name,
          route: pathname
        }]
      ))
    }
  }, [model])

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
          <Grid
            className='products__grid'
            container
            sx={{
              marginTop: '6px',
              width: "100%",
              paddingBottom: "18px",
              justifyContent: 'space-between'
            }}
          >
            <ProductModal />



            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <ProductSlider name="slider" sx={{ width: '640px', position: 'fixed' }} />
            </Grid>

            <Grid
              className="products__info"
              item
              xs={12}
              sm={12}
              md={5.5}
              lg={5.5}
              xl={5.5}
              sx={{ marginTop: "20px" }}
            >
              <Grid container gap={2} mb={'64px'}>

                <Grid item xs={12} lg={12} sm={12}>
                  <ProductInfo />
                </Grid>

                <Grid item xs={12} lg={12} sm={12}>
                  <ModelDownloadersList />
                </Grid>

                <Grid item xs={12} lg={12} sm={12}>
                  <ModelDownloadsAndTagsChartComponent />
                </Grid>

                <Grid item xs={12} lg={12} sm={12}>
                  <ModelInteriorsGrid />
                </Grid>
              </Grid>
            </Grid>

          </Grid>


        </Box>
      </Box>

    </>
  )
}
