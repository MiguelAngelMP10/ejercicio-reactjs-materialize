import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import RegistarAgente from "../RegistrarAgente";
import RegistrarPasarelaPago from "../RegistrarPasarelaPago";
import ColoresSistema from "../ColoresSistema";
import AcercaDeYNosotros from "../AcercaDeYNosotros";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.default,
    marginTop:30
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          aria-label="scrollable auto tabs example"
          
        >
          <Tab label="Registrar agentes " {...a11yProps(0)} />
          <Tab label="Registrar pasarelas de pago " {...a11yProps(1)} />
          <Tab label="Definir colores del sistema" {...a11yProps(2)} />
          <Tab label="Configurar Acerca de y Nosotros" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Typography variant="h3" component="h5">
          Agentes
        </Typography>
        <RegistarAgente></RegistarAgente>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h3" component="h5">
          Registrar pasarelas de pago
        </Typography>
        <RegistrarPasarelaPago></RegistrarPasarelaPago>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h3" component="h5">
          Definir colores del sistema
        </Typography>
        <ColoresSistema></ColoresSistema>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h3" component="h5">
          Configurar Acerca de y Nosotros
        </Typography>
        <AcercaDeYNosotros></AcercaDeYNosotros>
      </TabPanel>
    </div>
  );
}
