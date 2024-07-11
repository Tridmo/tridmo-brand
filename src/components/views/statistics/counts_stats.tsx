import { Box, Grid } from "@mui/material";
import CountsGrid from "./counts_component";
import { useSelector } from "../../../store";
import { selectRegStats, selectRegStatsStatus } from "../../../data/statistics/get_registrations_stats";
import { selectBrandsStats, selectBrandsStatsStatus } from "../../../data/statistics/get_brands_stats";
import { selectModelsStats, selectModelsStatsStatus } from "../../../data/statistics/get_models_stats";
import { selectCategoriesStats, selectCategoriesStatsStatus } from "../../../data/statistics/get_categories_stats";
import { selectDownloadsCount, selectDownloadsCountStatus } from "../../../data/statistics/get_downloads_stats";
import { selectInteriorsStats, selectInteriorsStatsStatus } from "../../../data/statistics/get_interiors_stats";
import { selectTagsCount, selectTagsCountStatus } from "../../../data/statistics/get_tags_stats";

export function CountsStats() {

  const modelsStats = useSelector(selectModelsStats)
  const downloadsStats = useSelector(selectDownloadsCount)
  const tagsStats = useSelector(selectTagsCount)

  const modelsStatsStatus = useSelector(selectModelsStatsStatus)
  const downloadsCountStatus = useSelector(selectDownloadsCountStatus)
  const tagsCountStatus = useSelector(selectTagsCountStatus)

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <CountsGrid
        fillWidth
        mainColor="#7210BE"
        loading={
          modelsStatsStatus == 'loading' ||
          downloadsCountStatus == 'loading' ||
          tagsCountStatus == 'loading'
        }
        data={[
          {
            name: 'Модели',
            count: modelsStats?.count,
            secondary_text: `Доступно: ${modelsStats?.available_count || ""} \nНе доступно: ${modelsStats?.unavailable_count || ""}`,
          },
          {
            name: 'Загрузки',
            count: downloadsStats?.count
          },
          {
            name: 'Бирки',
            count: tagsStats?.count
          },
        ]}
      />

    </Box>
  )
}