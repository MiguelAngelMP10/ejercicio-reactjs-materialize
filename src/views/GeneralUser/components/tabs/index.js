import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MisPagos from "./components/MisPagos";
import MisSuscripciones from "./components/MisSuscripciones";
import MisRecibos from "./components/MisRecibos";

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
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          scrollButtons="on"
          aria-label="scrollable auto tabs example" 
          centered
        >
          <Tab label="Mis Pagos " {...a11yProps(0)} />
          <Tab label="Mis suscripciones" {...a11yProps(2)} />
          <Tab label="Mis Recibos " {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Typography variant="h3" component="h5">
          Mis Pagos
          <MisPagos></MisPagos>
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h3" component="h5">
          Mis suscripciones
          <MisSuscripciones></MisSuscripciones>
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h3" component="h5">
          Mis Recibos
          <MisRecibos></MisRecibos>
        </Typography>
      </TabPanel>
    </div>
  );
}
