import React, { useEffect, useState, Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
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
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const ShowRoomInventory = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([]);
  const [showRooms, setShowRooms] = useState();

  const handleClick = async (item) => {
    const query = await firestore()
      .collection('showRoomInventory')
      .where('showRoomInventoryId', '==', Number(item))
      .limit(1)
      .get();

    let result = query.docs[0].data();
    setImages(result?.images?.urls);
  };

  const fetchShowRoomInventory = async (value) => {
    setImages([]);
    let test = [];
    if (value) {
      if (value.showRoomInventoryId === null) {
        console.log('Showroom Id is not avvailable');
      } else {
        setisLoading(false);
        const querySnapshot = await firestore()
          .collection('showRoomInventory')
          .where('showRoomId', '==', value.showRoomId)
          .get();

        querySnapshot.forEach((doc) => {
          test.push(doc.data());
          setRows(test);
        });
        setisLoading(true);
      }
    }
  };

  const defaultShowrooms = {
    options: showRooms,
    getOptionLabel: (option) => option.locationName || option
  };

  useEffect(() => {
    setisLoading(false);

    const fetchShowRoom = async () => {
      let showroomdata = [];
      const querySnapshot = await firestore().collection('showRooms').get();

      querySnapshot.forEach((doc) => {
        showroomdata.push(doc.data());
        setShowRooms(showroomdata);
      });
    };

    fetchShowRoom();
    setisLoading(true);
  }, []);
  if (!isLoading) return <FuseLoading />;
  return !rows ? (
    <></>
  ) : (
    <Fragment>
      <div className="stateAutocomplete" style={{ width: 300, marginLeft: 20 }}>
        <Autocomplete
          {...defaultShowrooms}
          id="showRoomId"
          getOptionSelected={(option, value) =>
            option.locationName === value.locationName
          }
          name="showRoom"
          onChange={(_, value) => {
            setRows([]);
            fetchShowRoomInventory(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Show Room Name" margin="normal" />
          )}
        />
      </div>
      <div className="flex flex-row">
        {images?.map((img, index) => (
          <div className="mb-8 w-224 mr-6 ">
            <img
              className="w-full border-grey-300 border-1 relative shadow-1 rounded-4"
              src={img?.url}
              key={img?.name}
              alt={''}
            />
            <div>{img?.name}</div>
          </div>
        ))}
      </div>

      <Button
        className="whitespace-no-wrap normal-case mb-24 ml-24"
        variant="contained"
        color="primary"
        onClick={() => {
          props.history.push('/apps/inventory/addshowroominventory');
        }}>
        Add Inventory
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Product Description</StyledTableCell>
              <StyledTableCell>Colour</StyledTableCell>
              <StyledTableCell>Material</StyledTableCell>
              <StyledTableCell>Shape</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort((a, b) =>
                a.showRoomInventoryId < b.showRoomInventoryId ? -1 : 1
              )
              .map((row) => (
                <StyledTableRow
                  onClick={(event) => handleClick(row.showRoomInventoryId)}
                  key={row.showRoomInventoryId}
                  className="cursor-pointer">
                  <StyledTableCell component="th" scope="row">
                    {row.sku}
                  </StyledTableCell>
                  <StyledTableCell>{row.brand}</StyledTableCell>
                  <StyledTableCell>{row.productDescription}</StyledTableCell>

                  <StyledTableCell>{row.colour}</StyledTableCell>
                  <StyledTableCell>{row.material}</StyledTableCell>
                  <StyledTableCell>{row.shape}</StyledTableCell>
                  <StyledTableCell>{`  ${row.sizeX}-${row.sizeY}-${row.sizeZ}   `}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>

                  <StyledTableCell>
                    <Button
                      className="whitespace-no-wrap normal-case"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        props.history.push(
                          `/apps/inventory/addshowroominventory/${row.showRoomInventoryId}`
                        );
                      }}>
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default withRouter(ShowRoomInventory);
