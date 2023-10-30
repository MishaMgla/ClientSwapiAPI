import { Link, Typography } from "@mui/material";
import { NameUrl } from "../../services/types";

interface NameUrlListProps {
  title: string;
  items: NameUrl[];
}

export const NameUrlList = ({ title, items }: NameUrlListProps) => {
  return (
    <Typography>
      {title}:{" "}
      {items.map((item, i) => (
        <span key={item.url}>
          {i !== 0 && ", "}
          <Link href={item.url}>{item.name}</Link>
        </span>
      ))}
    </Typography>
  );
};
