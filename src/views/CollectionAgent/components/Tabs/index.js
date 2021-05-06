import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Pagos from "../Pagos";
import Usuarios from "../Usuarios";
import AsignarCobros from "../AsignarCobros";
import ConceptosPago from "../ConceptosPago";

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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Pagos " {...a11yProps(0)} />
          <Tab label="Usuarios" {...a11yProps(1)} />
          <Tab label="Asignar cobros" {...a11yProps(2)} />
          <Tab label="Conceptos de pago" {...a11yProps(3)} />
          <Tab label="Conceptos de planes" {...a11yProps(4)} />
          <Tab label="Definición penalizaciones" {...a11yProps(5)} />
          <Tab label="Aprobación de pago" {...a11yProps(6)} />
          <Tab label="Cancelar pagos" {...a11yProps(7)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Typography variant="h3" component="h5">
          Pagos
        </Typography>
        <Pagos></Pagos>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h3" component="h5">
          Usuarios
        </Typography>
        <Usuarios></Usuarios>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h3" component="h5">
          Asignar cobros
          <AsignarCobros></AsignarCobros>
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h3" component="h5">
          Conceptos de pago
        </Typography>
        <ConceptosPago></ConceptosPago>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography variant="h3" component="h5">
          Conceptos de planes
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography variant="h3" component="h5">
          Definición penalizaciones
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography variant="h3" component="h5">
          Aprobación de pago
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Typography variant="h3" component="h5">
          Cancelar pagos
        </Typography>
      </TabPanel>
    </div>
  );
}
