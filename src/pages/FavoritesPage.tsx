import { useAppSelector } from "../store/hooks/redux";
import { Stack, Typography } from "@mui/material";
import { PeopleTable } from "./components/PeopleTable";

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites);
  const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

  return (
    <Stack maxWidth="lg" alignItems="center" margin="0 auto">
      {isEmptyObject(favorites) ? (
        <Typography variant="h5" color="#fff">
          Favorites is empty
        </Typography>
      ) : (
        <PeopleTable peoples={Object.values(favorites)} />
      )}
    </Stack>
  );
};

export default FavoritesPage;
