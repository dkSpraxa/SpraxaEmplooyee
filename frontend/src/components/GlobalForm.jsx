import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const GlobalForm = ({ element }) => {
  let components;
  switch (element.type) {
   
    case "submit":
      components = (
        <Button
          variant={element.variant}
          sx={{ width: element.width }}
          onClick={element.onClick}
        >
          {element.name}
        </Button>
      );
      break;
    case "select-department":

      components = (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId={element.labelId}
            id={element.id}
            value={element.value}
            label={element.label}
            name={element.name}
            onChange={element.onChange}
            required
          >
            <MenuItem value={"Developement"}>Development</MenuItem>
            <MenuItem value={"Testing"}>Testing</MenuItem>
            <MenuItem value={"HR"}>HR</MenuItem>
          </Select>
        </FormControl>
      );
      break;
      case "select-role":
      components = (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId={element.labelId}
            id={element.id}
            value={element.value}
            label={element.label}
            name={element.name}
            onChange={element.onChange}
            required
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
          </Select>
        </FormControl>
      );
      break;
    default:
      components = (
        <TextField
          label={element.label}
          name={element.name}
          type={element.type}
          value={element.value}
          onChange={element.onChange}
          error={element.error}
          helperText={element.helperText}
          required
        />
      );
  }
  return components;
};

export default GlobalForm;
