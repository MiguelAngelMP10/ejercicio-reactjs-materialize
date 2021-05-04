import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Select,
} from "@material-ui/core";

export default function Efectivo() {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-monto">monto</InputLabel>
      <Input
        id="standard-adornment-monto"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <FormControl>
        <InputLabel htmlFor="persona-native-simple">Cajer@</InputLabel>
        <Select
          native
          inputProps={{
            name: "persona",
            id: "persona-native-simple",
          }}
        >
          <option aria-label="None" value=""></option>
          <option value={"1"}>Pedro Cruz</option>
          <option value={"2"}>Miguel Marquez</option>
        </Select>
      </FormControl>
    </FormControl>
  );
}
