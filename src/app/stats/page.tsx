"use client"

import * as React from 'react';
import NotFoundPage from '@/components/site_info/not_found';
import Stats from '../../components/screens/stats';
import { useSelector } from 'react-redux';
import { getRegistrationsStats, selectRegStats, selectRegStatsStatus } from '../../data/statistics/get_registrations_stats';
import { useDispatch } from 'react-redux';
import { getModelsStats, selectModelsStats, selectModelsStatsStatus } from '../../data/statistics/get_models_stats';
import { getBrandsStats, selectBrandsStats, selectBrandsStatsStatus } from '../../data/statistics/get_brands_stats';
import { getCategoriesStats, selectCategoriesStats, selectCategoriesStatsStatus } from '../../data/statistics/get_categories_stats';
import { currentDate } from '../../utils/format_date';
import { selectTopListItemLimit } from '../../data/handle_filters';
import { getInteriorsStats, selectInteriorsStats, selectInteriorsStatsStatus } from '../../data/statistics/get_interiors_stats';
import { selectMyProfile } from '../../data/me';
import {
  getTagsCount, selectTagsCount, selectTagsCountStatus,
  getTagsChart, selectTagsChart, selectTagsChartStatus
} from '../../data/statistics/get_tags_stats';
import {
  getDownloadsCount, selectDownloadsCount, selectDownloadsCountStatus,
  getDownloadsChart, selectDownloadsChart, selectDownloadsChartStatus
} from '../../data/statistics/get_downloads_stats';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function StatsPage() {

  const dispatch = useDispatch<any>()
  const topListItemLimit = useSelector(selectTopListItemLimit)
  const profile = useSelector(selectMyProfile)

  // const regStats = useSelector(selectRegStats)
  // const downloadsCount = useSelector(selectDownloadsCount)
  // const downloadsChart = useSelector(selectDownloadsChart)
  // const modelsStats = useSelector(selectModelsStats)
  // const brandsStats = useSelector(selectBrandsStats)
  // const categoriesStats = useSelector(selectCategoriesStats)
  // const interiorsStats = useSelector(selectInteriorsStats)
  // const tagsCount = useSelector(selectTagsCount)
  // const tagsChart = useSelector(selectTagsChart)

  const regStatsStatus = useSelector(selectRegStatsStatus)
  const downloadsCountStatus = useSelector(selectDownloadsCountStatus)
  const downloadsChartStatus = useSelector(selectDownloadsChartStatus)
  const modelsStatsStatus = useSelector(selectModelsStatsStatus)
  const brandsStatsStatus = useSelector(selectBrandsStatsStatus)
  const categoriesStatsStatus = useSelector(selectCategoriesStatsStatus)
  const interiorsStatsStatus = useSelector(selectInteriorsStatsStatus)
  const tagsCountStatus = useSelector(selectTagsCountStatus)
  const tagsChartStatus = useSelector(selectTagsChartStatus)

  const { year, month, week } = currentDate()

  React.useEffect(() => {
    if (profile) {
      if (downloadsCountStatus == 'idle') {
        dispatch(getDownloadsCount({ month, year, brand_id: profile?.brand?.id }))
      }
      if (downloadsChartStatus == 'idle') {
        dispatch(getDownloadsChart({ month, year, brand_id: profile?.brand?.id }))
      }
      if (tagsCountStatus == 'idle') {
        dispatch(getTagsCount({ month, year, brand_id: profile?.brand?.id }))
      }
      if (tagsChartStatus == 'idle') {
        dispatch(getTagsChart({ month, year, brand_id: profile?.brand?.id }))
      }
      if (modelsStatsStatus == 'idle') {
        dispatch(getModelsStats({ limit: topListItemLimit, brand_id: profile?.brand?.id }))
      }
      if (categoriesStatsStatus == 'idle') {
        dispatch(getCategoriesStats({ limit: topListItemLimit, brand_id: profile?.brand?.id }))
      }
    }
  }, [
    profile,
    regStatsStatus,
    downloadsCountStatus,
    downloadsChartStatus,
    modelsStatsStatus,
    brandsStatsStatus,
    categoriesStatsStatus,
    interiorsStatsStatus,
    tagsCountStatus,
    tagsChartStatus,
  ])

  return (
    <>
      <Stats />
    </>
  )
}
