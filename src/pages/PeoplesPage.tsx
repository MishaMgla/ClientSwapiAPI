import { Stack, CircularProgress, Typography } from "@mui/material";
import { peopleApi } from "../services/PeopleApi";
import { PeopleTable } from "./components/PeopleTable";

const PeoplesPage = () => {
  const { data: peoples, isFetching, error } = peopleApi.useGetPeoplesQuery();

  return (
    <Stack maxWidth="lg" alignItems="center" margin="0 auto">
      {isFetching && <CircularProgress color="secondary" />}
      {error && <Typography>Something went wrong</Typography>}
      {!isFetching && !!peoples?.length && <PeopleTable peoples={peoples} />}
    </Stack>
  );
};

export default PeoplesPage;
