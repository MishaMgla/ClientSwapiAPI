import { IconButton } from "@mui/material";
import { People } from "../../models/People";
import favoriteSlice from "../../store/reducers/FavoriteSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export interface FavoriteButtonProps {
  people: People;
}

export const FavoriteButton = ({ people }: FavoriteButtonProps) => {
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  const handleAddFavorite = (person: People) => {
    dispatch(favoriteSlice.actions.add(person));
  };

  const handleRemoveFavorite = (id: string) => {
    dispatch(favoriteSlice.actions.remove(id));
  };

  const handleFavoriteClick = (people: People) => {
    favorites[people.id]
      ? handleRemoveFavorite(people.id)
      : handleAddFavorite(people);
  };

  const isFavorite = (people: People): boolean => !!favorites[people.id];

  return (
    <IconButton color="primary" onClick={() => handleFavoriteClick(people)}>
      {isFavorite(people) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
