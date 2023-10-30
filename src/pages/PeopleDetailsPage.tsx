import { useParams } from "react-router-dom";
import { peopleApi } from "../services/PeopleApi";
import {
  CircularProgress,
  Stack,
  Typography,
  Container,
  Link,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { NameUrlList } from "./components/NameUrlList";
import { FavoriteButton } from "./components/FavoriteButton";

const PeopleDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const {
    data: peopleDetails,
    isFetching,
    error,
  } = peopleApi.useGetPeopleByIdQuery(id);

  return (
    <Container maxWidth="md" component={Paper}>
      <Stack alignItems="center" gap="20px" padding="40px">
        {isFetching && <CircularProgress />}
        {error && <Typography>Something went wrong</Typography>}
        {!!peopleDetails && !isFetching && (
          <>
            <Typography variant="h2">{peopleDetails.name}</Typography>
            <FavoriteButton
              people={{
                id,
                name: peopleDetails.name,
                height: peopleDetails.height,
                mass: peopleDetails.mass,
                hairColor: peopleDetails.hair_color,
              }}
            />
            <Grid container spacing={3}>
              <Grid xs={6}>Height: {peopleDetails.height}</Grid>
              <Grid xs={6}>Mass: {peopleDetails.mass}</Grid>
              <Grid xs={6}>Hair color: {peopleDetails.hair_color}</Grid>
              <Grid xs={6}>Skin color: {peopleDetails.skin_color}</Grid>
              <Grid xs={6}>Eye color: {peopleDetails.eye_color}</Grid>
              <Grid xs={6}>Birth year: {peopleDetails.birth_year}</Grid>
              <Grid xs={6}>Gender: {peopleDetails.gender}</Grid>
              <Grid xs={6}>
                <Link href={peopleDetails.homeworld}>Homeworld</Link>
              </Grid>

              {!!peopleDetails.films.length && (
                <Grid xs={12}>
                  <NameUrlList title="Films" items={peopleDetails.films} />
                </Grid>
              )}

              {!!peopleDetails.species.length && (
                <Grid xs={12}>
                  <NameUrlList title="Species" items={peopleDetails.species} />
                </Grid>
              )}

              {!!peopleDetails.vehicles.length && (
                <Grid xs={12}>
                  <NameUrlList
                    title="Vehicles"
                    items={peopleDetails.vehicles}
                  />
                </Grid>
              )}

              {!!peopleDetails.starships.length && (
                <Grid xs={12}>
                  <NameUrlList
                    title="Starships"
                    items={peopleDetails.starships}
                  />
                </Grid>
              )}

              <Grid xs={6}>
                <Typography variant="caption">
                  Created at: {peopleDetails.created}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="caption">
                  Edited at: {peopleDetails.edited}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default PeopleDetailsPage;
