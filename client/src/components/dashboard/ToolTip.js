import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles(theme => ({
    
    speedDial: {
      
      position: "fixed",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(10),
        right: theme.spacing(0.1),
      },
    }
  }));
  
  const withLink = (to, children) => <Link to={to}>{children}</Link>;
  
  const actions = [
    { icon: withLink("/add-education", <SchoolIcon />), name: "Add Education" },
    { icon: withLink("/add-experience", <WorkIcon />), name: "Add Experience" },
    { icon: withLink("/edit-profile", <EditIcon />), name: "Edit" },
    { icon: withLink("/dashboard", <AccountCircleIcon />), name: "Dashboard" }
  ];

function ToolTip() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    return (
        <div className="tooltip">
        <div>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </div>
        </div>
    )
}

export default ToolTip
