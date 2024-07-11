"use client"

import React, { CSSProperties, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, SxProps, List, ListItem, ListItemText, ListItemAvatar, Divider, Skeleton, Input, TextField, FormControl, MenuItem, styled, Menu } from '@mui/material'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import Buttons from '../../buttons'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGES_BASE_URL } from '../../../utils/env_vars'
import EmptyData from '../empty_data'
import BasicPagination from '../../pagination/pagination'
import formatDate from '../../../utils/format_date'
import SearchInput from '../../inputs/search'
import SimpleSelect from '../../inputs/simple_select'
import { selectCategories, selectCategoriesByUserDownloads, selectCategoriesByUserInteriors, selectModelTagsCategories } from '../../../data/categories'
import { selectAllBrands } from '../../../data/get_all_brands'
import { ThemeProps } from '../../../types/theme'
import { toast } from 'react-toastify'
import { setCategoryFilter, setModelBrandFilter, setModelNameFilter, setModelTopFilter, set_model_interiors_categories, set_downloaded_model_brand, set_downloaded_model_categories, set_downloaded_model_name } from '../../../data/handle_filters'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../data/modal_checker'
import { selectAllBrandsByUserDownloads } from '../../../data/get_brands_by_user_downloads'
import { getDesignerDownloads, selectDesignerDownloads } from '../../../data/get_designer_downloads'
import { selectDesignerProfile } from '../../../data/get_designer'
import { selectModelInteriors } from '../../../data/get_model_interiors'
import { selectOneModel } from '../../../data/get_one_model'
import { getModelInteriors } from '../../../data/get_model_interiors'
import SimpleCard from '../../simple_card'

const fake = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const liHeaderTextSx = {
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '0.05em',
  textAlign: 'start',
  color: '#686868',
  textTransform: 'uppercase'
}

const modelImageWrapperSx: SxProps = {
  backgroundColor: '#fff',
  // border: '1px solid #E0E0E0',
  // borderRadius: '8px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}

const modelImageSx: CSSProperties = {
  width: '100% !important',
  height: '100% !important',
  // borderRadius: '8px',
  objectFit: 'contain'
}

const liSx: SxProps = {
  justifyContent: 'flex-start',
  padding: '0px',
  backgroundColor: '#fff',
  transition: '0.4s all ease',
  borderBottom: '2px solid #f5f5f5',

  '&:hover': {
    zIndex: '10',
    backgroundColor: '#fff',
    boxShadow: '0px 3px 4px 0px #00000014',
    borderColor: 'transparent',
  },
  '&:hover .brand_name': {
    color: '#0646E6 !important',
  },
}

const liHeaderSx: SxProps = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '10px 0px',
  borderBottom: '2px solid #f5f5f5',
}

const listSx: SxProps = {
  width: '100%',
  // backgroundColor: '#f5f5f5',
  backgroundColor: '#fff',
  boxShadow: '0px 3px 4px 0px #00000014',
  borderRadius: '4px',
  padding: '24px',
}


const widthControl = {

  '&:nth-of-type(1)': {
    minWidth: '300px',
    maxWidth: '300px',
  },
  '&:nth-of-type(2)': {
    minWidth: '300px',
    maxWidth: '300px',
  },
  '&:nth-of-type(3)': {
    minWidth: '200px',
    maxWidth: '200px',
  },
  '&:nth-of-type(4)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
  '&:nth-of-type(5)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
  '&:nth-of-type(6)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
}

const itemAsLink = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  height: '66px',
}


export default function ModelInteriorsGrid() {

  const router = useRouter();
  const dispatch = useDispatch<any>();

  const model = useSelector(selectOneModel)
  const all__interiors_status = useSelector((state: any) => state?.get_model_interiors?.status)
  const all__interiors = useSelector(selectModelInteriors)
  const all__categories = useSelector(selectModelTagsCategories)

  const get_model_interiors_categories = useSelector((state: any) => state?.handle_filters?.model_interiors_categories)
  const get_model_interiors_author = useSelector((state: any) => state?.handle_filters?.model_interiors_author)
  const get_model_interiors_orderby = useSelector((state: any) => state?.handle_filters?.model_interiors_orderby)
  const get_model_interiors_order = useSelector((state: any) => state?.handle_filters?.model_interiors_order)
  const get_model_interiors_page = useSelector((state: any) => state?.handle_filters?.model_interiors_page)

  const [category, setCategoryId] = useState<number>(-1)

  function handleCategoryChange(e) {
    setCategoryId(Number(e.target.value))
    const filter = e.target.value == -1 ? [] : [e.target.value];
    dispatch(getModelInteriors({
      model_id: model?.id,
      categories: filter,
      page: get_model_interiors_page,
      orderBy: get_model_interiors_orderby,
      order: get_model_interiors_order,
    }))
    dispatch(set_model_interiors_categories(filter))
  }

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#fff',
        p: '24px',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
        // boxShadow: '0px 3px 4px 0px #00000014',
        borderRadius: '12px',
      }}
    >
      <h3 style={{ margin: 0 }}>{'Бирки'}</h3>
      <Grid spacing={2} container sx={{ width: '100%', marginTop: "24px", marginLeft: 0 }} >
        <SimpleCard cols={3} route='model_interiors' cardImgHeight={'158px'} withAuthor />
      </Grid>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '12px',
      }}>
        <Pagination
          dataSource='model_interiors'
          dataId={model?.id}
          count={all__interiors?.data?.pagination?.pages}
          page={parseInt(all__interiors?.data?.pagination?.current) + 1}
        />
      </Box>
    </Box>
  )
}
