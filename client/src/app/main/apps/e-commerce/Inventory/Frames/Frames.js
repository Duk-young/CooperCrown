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

const Frames = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([]);

  const handleClick = async (item) => {
    const query = await firestore()
      .collection('frames')
      .where('frameId', '==', Number(item))
      .limit(1)
      .get();

    let result = query.docs[0].data();
    setImages(result.images.urls);
  };

  useEffect(() => {
    setisLoading(false);
    const fetchFrames = async () => {
      await firestore()
        .collection('frames')
        .get()
        .then((querySnapshot) => {
          let test = [];
          querySnapshot.forEach((doc) => {
            test.push(doc.data());
          });
          setRows(test);
          setisLoading(true);
        });
    };
    fetchFrames();
  }, []);
  if (!isLoading) return <FuseLoading />;
  return (
    <Fragment>
      <div className="flex flex-row">
        {images.map((img, index) => (
          <div className="mb-8 w-224 mr-6 ">
            <img
              className="w-full border-grey-300 border-1 relative shadow-1 rounded-4"
              src={img.url}
              key={img.name}
              alt={''}
            />
            <div
              className="flex flex-row justify-between items-center"
              onClick={() => {
                let newImages = images;
                newImages.splice(index, 1);
                setImages([...newImages]);
              }}>
              <div>{img.name}</div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="whitespace-no-wrap normal-case mb-24 ml-24"
        variant="contained"
        color="primary"
        onClick={() => {
          props.history.push('/apps/inventory/addframes');
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
              .sort((a, b) => (a.frameId < b.frameId ? -1 : 1))
              .map((row) => (
                <StyledTableRow
                  onClick={(event) => handleClick(row.frameId)}
                  key={row.frameId}
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
                          `/apps/inventory/addframes/${row.frameId}`
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

export default withRouter(Frames);
