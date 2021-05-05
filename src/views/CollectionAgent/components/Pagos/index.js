import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PorUsuario from "./components/PorUsuario";
import Realizados from "./components/Realizados";
import PorRealizar from "./components/PorRealizar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 345,
  },
  tabs: {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Pagos() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Pagos Por usuario" {...a11yProps(0)} />
        <Tab label="Pagos Realizados" {...a11yProps(1)} />
        <Tab label="Pagos Por realizar" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Pagos Por usuario
        <PorUsuario></PorUsuario>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Pagos Realizados
        <Realizados></Realizados>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Pagos Por realizar
        <PorRealizar></PorRealizar>
      </TabPanel>
    </div>
  );
}
