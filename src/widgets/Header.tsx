import { Stack, Link } from "@mui/material";
import { Search } from "./Search";

export const Header = () => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        padding: "20px",
        position: "sticky",
        marginBottom: "50px",
        borderBottom: "1px solid grey",
        bgcolor: "#fff",
        zIndex: 100,
      }}
    >
      <Link href="/peoples" variant="button">
        Peoples
      </Link>
      <Link href="/favorites" variant="button">
        Favorites
      </Link>
      <Search />
    </Stack>
  );
};
