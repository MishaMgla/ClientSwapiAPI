import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { People } from "../../models/People";
import { blue } from "@mui/material/colors";
import { FavoriteButton } from "./FavoriteButton";

export interface PeopleTableProps {
  peoples: People[];
}

export const PeopleTable = ({ peoples }: PeopleTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: "50px", marginBottom: "50px" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Mass</TableCell>
            <TableCell>HairColor</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {peoples.map((people) => (
            <TableRow
              key={people.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: blue[100],
                },
              }}
            >
              <TableCell>{people.name}</TableCell>
              <TableCell>{people.height}</TableCell>
              <TableCell>{people.mass}</TableCell>
              <TableCell>{people.hairColor}</TableCell>
              <TableCell>
                <FavoriteButton people={people} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
