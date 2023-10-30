import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { searchApi } from "../services/SearchApi";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const { data: searchResults, isFetching } =
    searchApi.useSearchQuery(inputValue);

  const debouncedFunction = useRef(
    debounce((newInputValue) => {
      setInputValue(newInputValue);
    }, 500),
  );

  const handleInputChange = useCallback(
    (_: React.SyntheticEvent, newInputValue: string) => {
      debouncedFunction.current(newInputValue);
    },
    [],
  );

  return (
    <Autocomplete
      options={searchResults || []}
      getOptionLabel={(option) => option.name}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, value) => {
        if (value) {
          navigate(`/people/${value?.id}`);
        }
      }}
      filterOptions={(options) => options}
      sx={{ width: 400 }}
      renderInput={(params) => (
        <Stack
          flexDirection="row"
          gap="10px"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField {...params} label="Search" />
          {isFetching && (
            <CircularProgress
              sx={{
                padding: "5px",
              }}
            />
          )}
        </Stack>
      )}
    />
  );
};
