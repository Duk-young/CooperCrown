import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const FramesTable = (props) => {
  const classes = useStyles();
  // const [isLoading, setisLoading] = useState(false);
  const { eyeglasses, setSelectedFrame, setEyeglasses, setDisabledState } =
    props;

  // if (isLoading) return <FuseLoading />;
  return !eyeglasses ? (
    <></>
  ) : (
    <div className="rounded-32">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Frame Brand</StyledTableCell>
              <StyledTableCell>Frame Model</StyledTableCell>
              <StyledTableCell>Frame Colour</StyledTableCell>
              <StyledTableCell>Lens Type</StyledTableCell>
              <StyledTableCell>Lens Detail</StyledTableCell>
              <StyledTableCell>Lens Colour</StyledTableCell>
              <StyledTableCell>Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eyeglasses.map((row, index) => (
              <StyledTableRow
                onClick={() => {
                  setSelectedFrame(row);
                }}
                key={index}
                hover
                className="cursor-pointer">
                <StyledTableCell component="th" scope="row">
                  {row.frameBrand}
                </StyledTableCell>
                <StyledTableCell>{row.frameModel}</StyledTableCell>
                <StyledTableCell>{row.frameColour}</StyledTableCell>
                <StyledTableCell>
                  {row.lensType === 'distance' && 'Distance'}
                  {row.lensType === 'read' && 'Read'}
                  {row.lensType === 'fTop' && 'F. Top'}
                  {row.lensType === 'progressive' && 'Progressive'}
                </StyledTableCell>
                <StyledTableCell>{row.lensDetail}</StyledTableCell>
                <StyledTableCell>{row.lensColour}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      let newEyeglasses = eyeglasses;
                      newEyeglasses.splice(index, 1);
                      setEyeglasses([...newEyeglasses]);
                      setSelectedFrame(row);
                      setDisabledState(false);
                    }}
                    aria-label="view">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withRouter(FramesTable);
