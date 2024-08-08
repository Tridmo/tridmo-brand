"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { AddBrandForm } from '../../../views/brand/add_brand_form';
import { useDispatch, useSelector } from 'react-redux';
import { selectOneBrand } from '../../../../data/get_one_brand';
import { getAllStyles } from '../../../../data/get_all_styles';

export default function EditBrand() {
  const dispatch = useDispatch<any>()
  const brand = useSelector(selectOneBrand)
  const stylesStatus = useSelector((state: any) => state?.get_all_styles?.status)

  useEffect(() => {
    if (stylesStatus == 'idle') {
      dispatch(getAllStyles())
    }
  }, [stylesStatus])

  return (
    <Box
      className='products__container'
      sx={{
        maxWidth: "1268px",
        width: "100%",
        margin: "0 auto !important",
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Grid
        container
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'608px'}
        m={'32px 0'}
      >
        <Grid item width={'100%'}>
          <AddBrandForm editing brand={brand} />
        </Grid>
      </Grid>
    </Box>
  )
}