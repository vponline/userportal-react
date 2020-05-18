import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AlertMUI from '@material-ui/lab/Alert';

const Alert = ({alerts}) => {
    
    const [open, setOpen] = useState(true);

    const closeAlert = () => {
        setOpen(!open);
        setTimeout(() => {
          setOpen(open => !open)
        }, 3200);
      };
      
    return (alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Collapse in={open}>
    <AlertMUI severity={(() => {
        switch (alert.alertType) {
          case "danger": return "error";
          case "success": return "success";
          default: return "";
        }
      })()} key={alert.id} className={`alert alert-${alert.alertType}`} action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="big"
          onClick={closeAlert}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
        {' '}{alert.msg}
    </AlertMUI>
    </Collapse>
)));}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
