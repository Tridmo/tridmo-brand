"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import ModelsPage from '@/components/screens/models';
import { getCategories } from '../../data/categories';
import { getAllBrands } from '../../data/get_all_brands';
import { selectMyProfile } from '../../data/me';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Models() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const profile = useSelector(selectMyProfile)

  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getTOpModelStatus = useSelector((state: any) => state?.get_top_models?.status);

  // ---- filters selector ----- //
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)
  const getCategoriesStatus = useSelector((state: any) => state?.categories?.status);
  const getBrandsStatus = useSelector((state: any) => state?.get_all_brands?.status);


  React.useEffect(() => {
    if (getCategoriesStatus == 'idle') dispatch(getCategories())
  }, [getCategoriesStatus])

  // React.useEffect(() => console.log(profile), [profile])
  React.useEffect(() => {
    if (profile) {
      if (getModelStatus === "idle") {
        dispatch(getAllModels({
          categories: getModelCategoryFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          brand: profile?.brand?.id,
          name: getModelNameFilter,
          page: getModelPageFilter,
          orderBy: getModelOrderBy,
          order: getModelOrder,
        }))
      }
    }
  }, [
    profile,
    getModelStatus,
    getTOpModelStatus,
    getModelCategoryFilter,
    getModelPageFilter,
    getModelNameFilter,
    getModelOrderBy,
    getModelOrder,
  ])



  return (
    <>
      <ModelsPage />
    </>
  )
}
