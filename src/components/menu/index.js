import { useContext, useState } from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "react-router-dom";
import SistemaContext from "../../context/sistema";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 50,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  itemLink: {
    textDecoration: "none",
    fontSize: "20px",
    textDecorationColor: "red",
    color: "blue",
  },
}));
export default function Menu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const { login } = useContext(SistemaContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ejercicio ReactJS con Materialize
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {!login ?( 
          <ListItem button key={"Login"}>
            <ListItemIcon>
              <InboxIcon />
              <Link to="/login" className={classes.itemLink}>
                {"Login"}
              </Link>
            </ListItemIcon>
          </ListItem>): (
            ""
          )}
          {login ? (
            <>
              <ListItem button key={"home"}>
                <ListItemIcon>
                  <InboxIcon />
                  <Link to="/" className={classes.itemLink}>
                    {"home"}
                  </Link>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={"general-user"}>
                <ListItemIcon>
                  <InboxIcon />
                  <Link to="/general-user" className={classes.itemLink}>
                    {"usuario General"}
                  </Link>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={"collection-agent"}>
                <ListItemIcon>
                  <InboxIcon />
                  <Link to="/collection-agent" className={classes.itemLink}>
                    {"Agente de cobro"}
                  </Link>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={"admin"}>
                <ListItemIcon>
                  <InboxIcon />
                  <Link to="/admin" className={classes.itemLink}>
                    {"Admin"}
                  </Link>
                </ListItemIcon>
              </ListItem>
            </>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
      </main>
    </div>
  );

  // return (
  //   <div>
  //     <AppBar position="sticky" color="transparent">
  //       <Toolbar color="inherit" aria-label="menu">
  //         <Typography className={classes.right} variant="body1" color="inherit">
  //           <div className={classes.right}>
  //             <Link to="/">{"Home"}</Link>
  //           </div>
  //           <div className={classes.right}>
  //             <Link to="/general-user">{"usuario General"}</Link>
  //           </div>
  //           <div className={classes.right}>
  //             <Link to="/login">{"Agente de Cobro"}</Link>
  //           </div>
  //           <div className={classes.right}>
  //             <Link to="/login">{"Admin"}</Link>
  //           </div>
  //           <div className={classes.right}>
  //             <Link to="/login">{"Login"}</Link>
  //           </div>
  //         </Typography>
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );
}
