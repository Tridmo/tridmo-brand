"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import { sampleInterior, sampleModel, sampleUser } from '@/data/samples';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import ProfileInfo from '@/components/views/profile/info';
import Image from 'next/image';
import BasicPagination from '@/components/pagination/pagination';
import EmptyData from '@/components/views/empty_data';
import { useParams } from 'next/navigation';
import { getDesignerProfile, selectDesignerProfile } from '../../../../data/get_designer';
import SimpleCard from '../../../simple_card';
import { selectAuthorInteriors } from '../../../../data/get_author_interiors';


export default function DesignerProfile() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const interiors = useSelector(selectAuthorInteriors)

  const designerWorks = interiors?.data?.interiors

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
          <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

            <Grid item xs={4} sx={{ paddingRight: "10px" }}>
              <ProfileInfo of='designer' />
            </Grid >

            <Grid item xs={8}
              style={{
                paddingLeft: "40px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <SimpleTypography
                  text="Галерея"
                  className="section__title"
                  variant="h2"
                />

                <SimpleCard route='designer_interiors' cols={3} cardImgHeight={232} withAuthor={true} />

              </Box>
              {designerWorks?.length > 0 ? (
                <Grid
                  item
                  xs={6}
                  sx={{
                    padding: "0 !important",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    flexBasis: 'auto !important'
                  }}
                >
                  <BasicPagination
                    dataSource='designer_interiors'
                    count={designerWorks?.data?.pagination?.pages}
                    page={parseInt(designerWorks?.data?.pagination?.current) + 1}
                  />
                </Grid>
              ) : null}
            </Grid>


          </Grid>
        </Box>
      </Box>

    </>
  )
}
