// import OrdersForm from "@/components/dashboard/orders/OrdersForm";
import OrdersTable from "@/components/dashboard/orders/OrdersTable";
import { Grid, Stack, Typography } from "@mui/material";

const Page = () => {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Orders</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid lg={8} md={6} xs={12}>
          {/* <OrdersForm /> */}
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <OrdersTable />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
