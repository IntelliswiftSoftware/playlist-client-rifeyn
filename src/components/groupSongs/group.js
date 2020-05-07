import React from 'react';
import {  Row, Col} from 'reactstrap'
import { loadingActions } from '../../redux';
import crop from '../../images/crop.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { width } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#6c757d",
    '& .MuiCheckbox-root': {
      color: "#6c757d" 
    }
  }
}));

const deleteIconStyle = { color: '#ffffff', position: 'absolute', top: 0, right: 25 };

const Group = (props) => {

  const { item, key, type, deleteFlag, deleteGroup } = props;
  
    const handleClick = (item) => {
      loadingActions.selectedGroup({type: type, payload: item});
    }
    const classes = useStyles();
    return(
      <>
      <div className="box" key={key} style={{minWidth: 150}}>
          <Row>
            <Col xs={12}>
              <img src={item.image ? item.image.basepath+item.image.high : crop} onClick={() => handleClick(item)} />
              <p className="title">{item.name || item.title || item.firstname}{' '}</p>
              {deleteFlag && <DeleteIcon style={ deleteIconStyle } onClick={() => deleteGroup(item.id)}/>}
            </Col>
          </Row>
        </div>
      </>
    )
};

export default Group;