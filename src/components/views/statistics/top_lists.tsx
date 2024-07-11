import { Box, Grid } from "@mui/material";
import { BrandTopList } from "./brands/top_list";
import { ModelTopList } from "./models/top_list";
import { CategoriesTopList } from "./categories/top_list";


export default function TopLists() {
  return (
    <>
      <Grid container
        gap={2}
        sx={{
          width: '100%',
        }}
      >
        <Grid item xs={true} lg={true} md={true} sm={true}
          sx={{
            p: '24px',
            bgcolor: '#fff',
            boxShadow: '0px 3px 4px 0px #00000014',
            borderRadius: '4px',
          }}
        >
          <ModelTopList />
        </Grid>

        <Grid item xs={true} lg={true} md={true} sm={true}
          sx={{
            p: '24px',
            bgcolor: '#fff',
            boxShadow: '0px 3px 4px 0px #00000014',
            borderRadius: '4px',
          }}
        >
          <CategoriesTopList />
        </Grid>

      </Grid>
    </>
  )
}