import { firestore } from 'firebase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import CustomAlert from '../../ReusableComponents/CustomAlert';
import FormControl from '@material-ui/core/FormControl';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ImageSlider from '../../ReusableComponents/ImageSlider';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 0,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  transparentButton: {
    backgroundColor: '#fff',
    color: '#000000',
    boxShadow: 'none',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#F5F5F5',
      color: '#000000'
    }
  },
  buttonBlack: {
    backgroundColor: '#000000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff'
    }
  },
  table: {
    minWidth: 700
  }
}));

function ViewFrame(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { form, setForm } = useForm(null);
  const [isLoading, setisLoading] = useState(false);
  const routeParams = useParams();
  const [addStock, setAddStock] = useState({});
  const [openAddStockAlert, setOpenAddStockAlert] = useState(false);
  const [subtractStock, setSubtractStock] = useState({});
  const [subtractedStocks, setSubtractedStocks] = useState([]);
  const [openSubtractStockAlert, setOpenSubtractStockAlert] = useState(false);
  const [restocks, setRestocks] = useState([]);
  const [openImageSlider, setOpenImageSlider] = useState(false)
  const [editRestockState, setEditRestockState] = useState(false);
  const [imageIndex, setImageIndex] = useState(0)
  const [openUpdateRestockAlert, setOpenUpdateRestockAlert] = useState(false);
  const [editSubtractStockState, seteditSubtractStockState] = useState(false);
  const [openUpdateSubtractStockAlert, setOpenUpdateSubtractStockAlert] =
    useState(false);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  const handleAddStock = async () => {
    console.log(addStock);
    await firestore()
      .collection('frames')
      .doc(form?.id)
      .update({ quantity: +form?.quantity + addStock?.addStockQty });

    const dbConfig = (
      await firestore().collection('dbConfig').doc('dbConfig').get()
    ).data();
    await firestore()
      .collection('restocks')
      .add({
        ...addStock,
        restockDate: firestore.Timestamp.fromDate(new Date()),
        restockId: dbConfig?.restockId + 1,
        frameId: form?.frameId
      });

    await firestore()
      .collection('dbConfig')
      .doc('dbConfig')
      .update({ restockId: dbConfig?.restockId + 1 });

    restocks.push({
      ...addStock,
      restockDate: firestore.Timestamp.fromDate(new Date()),
      restockId: dbConfig?.restockId + 1,
      frameId: form?.frameId
    });

    setForm({ ...form, quantity: +form?.quantity + addStock?.addStockQty });
    setAddStock({ addStockQty: 0, addStockMemo: '' });
    dispatch(
      MessageActions.showMessage({
        message: 'Stock added successfully'
      })
    );
  };

  const handleUpdateRestock = async () => {
    const queryRestock = await firestore()
      .collection('restocks')
      .where('restockId', '==', Number(addStock?.restockId))
      .limit(1)
      .get();
    let resultRestock = queryRestock.docs[0].data();
    resultRestock.id = queryRestock.docs[0].id;
    await firestore()
      .collection('restocks')
      .doc(resultRestock.id)
      .update({
        addStockQty: addStock?.addStockQty,
        addStockMemo: addStock?.addStockMemo,
        restockDate: firestore.Timestamp.fromDate(new Date())
      });

    await firestore()
      .collection('frames')
      .doc(form?.id)
      .update({
        quantity:
          +form?.quantity - addStock?.row?.addStockQty + addStock?.addStockQty
      });
    restocks.push({
      ...addStock,
      row: '',
      restockDate: firestore.Timestamp.fromDate(new Date())
    });
    setForm({
      ...form,
      quantity:
        +form?.quantity - addStock?.row?.addStockQty + addStock?.addStockQty
    });
    setAddStock({ addStockQty: 0, addStockMemo: '' });
    setEditRestockState(false);

    dispatch(
      MessageActions.showMessage({
        message: 'Restock entry updated successfully'
      })
    );
  };

  const handleSubtractStock = async () => {
    await firestore()
      .collection('frames')
      .doc(form?.id)
      .update({ quantity: +form?.quantity - subtractStock?.subtractStockQty });

    const dbConfig = (
      await firestore().collection('dbConfig').doc('dbConfig').get()
    ).data();
    await firestore()
      .collection('subtractStocks')
      .add({
        ...subtractStock,
        subtractStockDate: firestore.Timestamp.fromDate(new Date()),
        subtractStockId: dbConfig?.subtractStockId + 1,
        frameId: form?.frameId
      });

    await firestore()
      .collection('dbConfig')
      .doc('dbConfig')
      .update({ subtractStockId: dbConfig?.subtractStockId + 1 });

    subtractedStocks.push({
      ...subtractStock,
      subtractStockDate: firestore.Timestamp.fromDate(new Date()),
      subtractStockId: dbConfig?.subtractStockId + 1,
      frameId: form?.frameId
    });

    setForm({
      ...form,
      quantity: +form?.quantity - subtractStock?.subtractStockQty
    });
    setSubtractStock({ subtractStockQty: 0, subtractStockMemo: '' });
    dispatch(
      MessageActions.showMessage({
        message: 'Stock subtracted successfully'
      })
    );
  };

  const handleUpdateSubtractStock = async () => {
    const querySubtractedStock = await firestore()
      .collection('subtractStocks')
      .where('subtractStockId', '==', Number(subtractStock?.subtractStockId))
      .limit(1)
      .get();
    let resultSubtractedStock = querySubtractedStock.docs[0].data();
    resultSubtractedStock.id = querySubtractedStock.docs[0].id;
    await firestore()
      .collection('subtractStocks')
      .doc(resultSubtractedStock.id)
      .update({
        subtractStockQty: subtractStock?.subtractStockQty,
        subtractStockMemo: subtractStock?.subtractStockMemo,
        subtractStockDate: firestore.Timestamp.fromDate(new Date())
      });

    await firestore()
      .collection('frames')
      .doc(form?.id)
      .update({
        quantity:
          +form?.quantity +
          subtractStock?.row?.subtractStockQty -
          subtractStock?.subtractStockQty
      });
    subtractedStocks.push({
      ...subtractStock,
      row: '',
      subtractStockDate: firestore.Timestamp.fromDate(new Date())
    });
    setForm({
      ...form,
      quantity:
        +form?.quantity +
        subtractStock?.row?.subtractStockQty -
        subtractStock?.subtractStockQty
    });
    setSubtractStock({ subtractStockQty: 0, subtractStockMemo: '' });
    seteditSubtractStockState(false);

    dispatch(
      MessageActions.showMessage({
        message: 'Subtracted stock entry updated successfully'
      })
    );
  };

  useEffect(() => {
    const id = routeParams.frameId;
    const fetchFrame = async () => {
      const queryFrame = await firestore()
        .collection('frames')
        .where('frameId', '==', Number(id))
        .limit(1)
        .get();

      let resultFrame = queryFrame.docs[0].data();
      resultFrame.date = resultFrame.date && resultFrame.date.toDate();
      resultFrame.id = queryFrame.docs[0].id;
      setForm(resultFrame);
      setImages(resultFrame.images.urls);

      const queryRestocks = await firestore()
        .collection('restocks')
        .where('frameId', '==', Number(id))
        .get();
      let resultRestocks = [];
      queryRestocks.forEach((doc) => {
        resultRestocks.push(doc.data());
      });
      setRestocks(resultRestocks);

      const querySubtractedStocks = await firestore()
        .collection('subtractStocks')
        .where('frameId', '==', Number(id))
        .get();
      let resultSubtractedStocks = [];
      querySubtractedStocks.forEach((doc) => {
        resultSubtractedStocks.push(doc.data());
      });


      let resultOrders = [];

      const queryOrders = await firestore().collection('orders').get()
      queryOrders.forEach((doc) => { resultOrders.push(doc.data()); });
      resultOrders.forEach((order) => {
        if (order.eyeglasses.length > 0) {
          let frameSaleRecord = { orderId: order?.orderId, customOrderId: order?.customOrderId, subtractStockDate: order?.orderDate, subtractStockQty: 0, recordType: 'Sale from order' }
          order.eyeglasses.map((pair) => {
            if (pair?.frameId === Number(id)) {
              frameSaleRecord.subtractStockQty++
            }
            return true
          })
          if (frameSaleRecord?.subtractStockQty > 0) resultSubtractedStocks.push(frameSaleRecord)
        }
      })



      setSubtractedStocks(resultSubtractedStocks);

      setisLoading(false);
    };

    if (id) fetchFrame();
    else {
      setForm({});
      setisLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot
      }}
      header={
        <div className='flex flex-row w-full'>
          <div className='flex flex-row w-1/3 h-16'>
            <IconButton
              onClick={() => { props.history.push(`/apps/inventory`); }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Inventory</span>
            </IconButton>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h6">FRAME DETAIL</Typography>
          </div>
          <div className='flex flex-row w-1/3'></div>
        </div>
      }
      content={
        !form ? (
          <></>
        ) : (
          <div className="flex flex-col p-16 sm:p-24 ">
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-1/2 p-6">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      PRODUCT INFO
                    </h1>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 p-6">
                      <div className="flex flex-col p-2 border-1 border-grey-400 border-solid rounded-4">
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            SKU
                          </InputLabel>
                          <Input
                            id="standard-adornment-password"
                            value={form?.sku ? form?.sku : ''}
                            name="sku"
                          />
                        </FormControl>
                      </div>
                      <TextField
                        className="mt-8"
                        required
                        label="Brand"
                        id="brand"
                        name="brand"
                        value={form?.brand ? form?.brand : ''}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Model Name"
                        id="productDescription"
                        name="productDescription"
                        value={
                          form?.productDescription
                            ? form?.productDescription
                            : ''
                        }
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Colour"
                        id="colour"
                        name="colour"
                        value={form?.colour ? form?.colour : ''}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        label="Material"
                        id="material"
                        name="material"
                        value={form?.material ? form?.material : ''}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Shape"
                        id="shape"
                        name="shape"
                        value={form?.shape ? form?.shape : ''}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Quantity"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={form?.quantity ? form?.quantity : ''}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-32">
                    <div className="flex flex-col w-1/3 justify-center items-center">
                      <h3 className="font-700">PRINTED SIZE</h3>
                    </div>
                    <div className="flex flex-row w-2/3 justify-center pr-92 gap-8">
                      <TextField
                        required
                        label="A"
                        id="sizeX"
                        name="sizeX"
                        value={form?.sizeX ? form?.sizeX : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="B"
                        id="sizeY"
                        name="sizeY"
                        value={form?.sizeY ? form?.sizeY : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="TEMPLE"
                        id="sizeZ"
                        name="sizeZ"
                        value={form?.sizeZ ? form?.sizeZ : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-32">
                    <div className="flex flex-col w-1/3 justify-center items-center">
                      <h3 className="font-700">MEASURED SIZE</h3>
                    </div>
                    <div className="flex flex-row w-2/3 justify-center pr-12 gap-8">
                      <TextField
                        required
                        label="A"
                        id="sizeA"
                        name="sizeA"
                        value={form?.sizeA ? form?.sizeA : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="B"
                        id="sizeB"
                        name="sizeB"
                        value={form?.sizeB ? form?.sizeB : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="DBL"
                        id="sizeDbl"
                        name="sizeDbl"
                        value={form?.sizeDbl ? form?.sizeDbl : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="ED"
                        id="sizeEd"
                        name="sizeEd"
                        value={form?.sizeEd ? form?.sizeEd : ''}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                    </div>
                  </div>
                  <ImageSlider open={openImageSlider} handleClose={() => setOpenImageSlider(false)}
                    images={images?.length > 0 ? images.map((img) => img.url) : []} imageIndex={imageIndex} />
                  <div className="flex flex-row w-full overflow-scroll flex-wrap mt-10 p-6">
                    {images.map((img, index) => (
                      <div className="mb-8 w-224 mr-6 object-contain">
                        <img
                          className="w-224 h-128 shadow-1 rounded-4"
                          onClick={() => {
                            setImageIndex(index)
                            setOpenImageSlider(true)
                          }}
                          src={img.url}
                          key={img.name}
                          alt={''}
                        />
                        <div className="flex flex-row justify-between items-center">
                          <div className="truncate">
                            <TextField
                              size="small"
                              className="mt-12 "
                              fullWidth
                              label="Name"
                              id="outlined-multiline-static"
                              value={images[index].name.split('.', 1)}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={classes.orangeButton}
                    variant="contained"
                    style={{ minHeight: '40px', maxHeight: '40px' }}
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.inventoryEdit) {
                        props.history.push(
                          `/apps/inventory/addframes/${routeParams?.frameId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    EDIT
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-6">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      SUPPLIER INFO
                    </h1>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        label="Made In"
                        id="madeIn"
                        name="madeIn"
                        value={form?.madeIn ? form?.madeIn : ''}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Company"
                        id="supplier"
                        name="supplier"
                        value={form?.supplier ? form?.supplier : ''}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        multiline
                        minRows={4}
                        maxRows={4}
                        label="Address"
                        id="supplierAddress"
                        name="supplierAddress"
                        value={
                          form?.supplierAddress ? form?.supplierAddress : ''
                        }
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Contact"
                        id="supplierContact"
                        name="supplierContact"
                        value={
                          form?.supplierContact ? form?.supplierContact : ''
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        multiline
                        minRows={15}
                        maxRows={15}
                        label="Note"
                        id="supplierNotes"
                        name="supplierNotes"
                        value={form?.supplierNotes ? form?.supplierNotes : ''}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    PRICE/SALE
                  </h1>
                </div>
                <div className="flex flex-row justify-around p-32">
                  <TextField
                    label="W.S $"
                    id="ws"
                    name="ws"
                    value={form?.ws ? form?.ws : ''}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    label="Retail $"
                    id="retailRate"
                    name="retailRate"
                    value={form?.retailRate ? form?.retailRate : ''}
                    variant="outlined"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full">
              <div className="flex flex-col p-6 w-full md:w-1/2">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      PRODUCT HISTORY
                    </h1>
                  </div>

                  <div className="flex flex-row justify-around p-32">
                    <TextField
                      label="QTY"
                      id="addStockQty"
                      name="addStockQty"
                      error={errors?.addStockError}
                      helperText={errors?.addStockError}
                      value={addStock?.addStockQty ? addStock?.addStockQty : ''}
                      onChange={(e) => {
                        setAddStock({
                          ...addStock,
                          addStockQty: Number(e.target.value)
                        });
                      }}
                      variant="outlined"
                      type="number"
                    />
                    <TextField
                      multiline
                      maxRows={4}
                      label="Memo"
                      id="addStockMemo"
                      name="addStockMemo"
                      value={
                        addStock?.addStockMemo ? addStock?.addStockMemo : ''
                      }
                      onChange={(e) => {
                        setAddStock({
                          ...addStock,
                          addStockMemo: e.target.value
                        });
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div className="flex flex-col p-12">
                    <CustomAlert
                      open={openAddStockAlert}
                      setOpen={setOpenAddStockAlert}
                      text1="Save Changes?"
                      text2="Entered Qty will be added!"
                      customFunction={() => {
                        handleAddStock();
                      }}
                    />
                    {!editRestockState && (
                      <Button
                        className={classes.orangeButton}
                        variant="contained"
                        style={{ minHeight: '40px', maxHeight: '40px' }}
                        onClick={() => {
                          if (addStock?.addStockQty > 0) {
                            setOpenAddStockAlert(true);
                            setErrors({});
                          } else {
                            setErrors({
                              ...errors,
                              addStockError: 'Quantity is invalid'
                            });
                          }
                        }}>
                        <Icon>add</Icon>
                        ADD STOCK
                      </Button>
                    )}
                    {editRestockState && (
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-3/4">
                          <CustomAlert
                            open={openUpdateRestockAlert}
                            setOpen={setOpenUpdateRestockAlert}
                            text1="Update Changes?"
                            text2="Entered Qty will be updated!"
                            customFunction={() => {
                              handleUpdateRestock();
                            }}
                          />
                          <Button
                            className={classes.orangeButton}
                            variant="contained"
                            style={{ minHeight: '40px', maxHeight: '40px' }}
                            onClick={() => {
                              if (addStock?.addStockQty > 0) {
                                setOpenUpdateRestockAlert(true);
                                setErrors({});
                              } else {
                                setErrors({
                                  ...errors,
                                  addStockError: 'Quantity is invalid'
                                });
                              }
                            }}>
                            <Icon>edit</Icon>
                            UPDATE STOCK
                          </Button>
                        </div>
                        <div className="flex flex-col w-1/4 pl-6">
                          <Button
                            className={classes.buttonBlack}
                            variant="contained"
                            style={{ minHeight: '40px', maxHeight: '40px' }}
                            onClick={() => {
                              restocks.push({ ...addStock?.row });
                              setAddStock({ addStockQty: 0, addStockMemo: '' });
                              setEditRestockState(false);
                            }}>
                            <Icon>cancel</Icon>
                            CANCEL
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-224 overflow-scroll">
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                        stickyHeader>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>QUANTITY</StyledTableCell>
                            <StyledTableCell>MEMO</StyledTableCell>
                            <StyledTableCell>OPTIONS</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {restocks
                            .sort((a, b) =>
                              a.restockId > b.restockId ? -1 : 1
                            )
                            .map((row, index) => (
                              <StyledTableRow key={row.restockId}>
                                <StyledTableCell>
                                  {' '}
                                  {moment(row.restockDate.toDate()).format(
                                    'MM/DD/YYYY'
                                  )}
                                </StyledTableCell>

                                <StyledTableCell>
                                  {row?.addStockQty}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row?.addStockMemo}
                                </StyledTableCell>

                                <StyledTableCell>
                                  <IconButton
                                    onClick={() => {
                                      setAddStock({ ...row, row });
                                      restocks.splice(index, 1);
                                      setEditRestockState(true);
                                    }}>
                                    <Icon>edit</Icon>
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 w-full md:w-1/2">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      SALES HISTORY
                    </h1>
                  </div>

                  <div className="flex flex-row justify-around p-32">
                    <TextField
                      label="QTY"
                      id="subtractStockQty"
                      name="subtractStockQty"
                      error={errors?.subtractStockError}
                      helperText={errors?.subtractStockError}
                      value={
                        subtractStock?.subtractStockQty
                          ? subtractStock?.subtractStockQty
                          : ''
                      }
                      onChange={(e) => {
                        setSubtractStock({
                          ...subtractStock,
                          subtractStockQty: Number(e.target.value)
                        });
                      }}
                      variant="outlined"
                      type="number"
                    />
                    <TextField
                      multiline
                      maxRows={4}
                      label="Memo"
                      id="subtractStockMemo"
                      name="subtractStockMemo"
                      value={
                        subtractStock?.subtractStockMemo
                          ? subtractStock?.subtractStockMemo
                          : ''
                      }
                      onChange={(e) => {
                        setSubtractStock({
                          ...subtractStock,
                          subtractStockMemo: e.target.value
                        });
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div className="flex flex-col p-12">
                    <CustomAlert
                      open={openSubtractStockAlert}
                      setOpen={setOpenSubtractStockAlert}
                      text1="Save Changes?"
                      text2="Entered Qty will be subtracted!"
                      customFunction={() => {
                        handleSubtractStock();
                      }}
                    />
                    {!editSubtractStockState && (
                      <Button
                        className={classes.orangeButton}
                        variant="contained"
                        style={{ minHeight: '40px', maxHeight: '40px' }}
                        onClick={() => {
                          if (
                            subtractStock?.subtractStockQty > 0 &&
                            subtractStock?.subtractStockQty <= form?.quantity
                          ) {
                            setOpenSubtractStockAlert(true);
                            setErrors({});
                          } else {
                            setErrors({
                              ...errors,
                              subtractStockError: 'Quantity is invalid'
                            });
                          }
                        }}>
                        <RemoveIcon /> SUBTRACT STOCK
                      </Button>
                    )}
                    {editSubtractStockState && (
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-3/4">
                          <CustomAlert
                            open={openUpdateSubtractStockAlert}
                            setOpen={setOpenUpdateSubtractStockAlert}
                            text1="Update Changes?"
                            text2="Entered Qty will be updated!"
                            customFunction={() => {
                              handleUpdateSubtractStock();
                            }}
                          />
                          <Button
                            className={classes.orangeButton}
                            variant="contained"
                            style={{ minHeight: '40px', maxHeight: '40px' }}
                            onClick={() => {
                              if (subtractStock?.subtractStockQty > 0) {
                                setOpenUpdateSubtractStockAlert(true);
                                setErrors({});
                              } else {
                                setErrors({
                                  ...errors,
                                  subtractStockError: 'Quantity is invalid'
                                });
                              }
                            }}>
                            <Icon>edit</Icon>
                            UPDATE STOCK
                          </Button>
                        </div>
                        <div className="flex flex-col w-1/4 pl-6">
                          <Button
                            className={classes.buttonBlack}
                            variant="contained"
                            style={{ minHeight: '40px', maxHeight: '40px' }}
                            onClick={() => {
                              subtractedStocks.push({ ...subtractStock?.row });
                              setSubtractStock({
                                subtractStockQty: 0,
                                subtractStockMemo: ''
                              });
                              seteditSubtractStockState(false);
                            }}>
                            <Icon>cancel</Icon>
                            CANCEL
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-224 overflow-scroll">
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                        stickyHeader>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>ORDER ID</StyledTableCell>
                            <StyledTableCell>QUANTITY</StyledTableCell>
                            <StyledTableCell>MEMO</StyledTableCell>
                            <StyledTableCell>OPTIONS</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subtractedStocks
                            .sort((a, b) =>
                              a.subtractStockId > b.subtractStockId ? -1 : 1
                            )
                            .map((row, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell>{' '}{moment(row.subtractStockDate.toDate()).format('MM/DD/YYYY')}</StyledTableCell>
                                <StyledTableCell onClick={() => { props.history.push(`/apps/e-commerce/orders/vieworder/${row?.orderId}`) }}>
                                  {row?.customOrderId}
                                </StyledTableCell>
                                <StyledTableCell>{row?.subtractStockQty}</StyledTableCell>
                                <StyledTableCell>{row?.subtractStockMemo ?? row?.recordType}</StyledTableCell>

                                <StyledTableCell>
                                  <IconButton
                                    onClick={() => {
                                      if (row?.recordType === 'Sale from order') {
                                        toast.error('Order sale cannot be edited.', {
                                          position: 'top-center',
                                          autoClose: 5000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          transition: Zoom
                                        });
                                      } else {
                                        setSubtractStock({ ...row, row });
                                        subtractedStocks.splice(index, 1);
                                        seteditSubtractStockState(true);
                                      }
                                    }}>
                                    <Icon>edit</Icon>
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
}

export default ViewFrame;
