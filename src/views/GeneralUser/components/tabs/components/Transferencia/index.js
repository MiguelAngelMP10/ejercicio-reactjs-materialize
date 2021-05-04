import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Select,
} from "@material-ui/core";

export default function Transferencia() {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-monto">monto</InputLabel>
      <Input
        id="standard-adornment-monto"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <FormControl>
        <InputLabel htmlFor="banco-native-simple">Banco</InputLabel>
        <Select
          native
          inputProps={{
            name: "banco",
            id: "banco-native-simple",
          }}
        >
          <option aria-label="None" value=""></option>
          <option value={"BBVA"}>BBVA</option>
          <option value={"BANCOAZTECA"}>BANCOAZTECA</option>
          <option value={"BANAMEX"}>BANAMEX</option>
        </Select>
      </FormControl>
    </FormControl>
  );
}
