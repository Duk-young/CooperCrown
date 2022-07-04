import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
      backgroundColor: '#372b25',
      color: '#fff'
    }
  },
  table: {
    minWidth: 700
  }
}));

function ViewOther(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const { form, setForm } = useForm(null);
  const [isLoading, setisLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const id = routeParams.otherId;
    const fetchOther = async () => {
      const queryOther = await firestore()
        .collection('other')
        .where('otherId', '==', Number(id))
        .limit(1)
        .get();

      let resultOther = queryOther.docs[0].data();
      resultOther.date = resultOther.date && resultOther.date.toDate();
      resultOther.id = queryOther.docs[0].id;
      setForm(resultOther);
      setImages(resultOther.images.urls);

      setisLoading(false);
    };

    if (id) fetchOther();
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
        <div>
          <IconButton
            onClick={() => {
              props.history.push(`/apps/inventory`);
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Inventory</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Product Detail
            </Typography>
          </div>
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
                      <div className="flex flex-col p-2 border-1 border-grey-400">
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
                        value={form?.brand}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Model Name"
                        id="productDescription"
                        name="productDescription"
                        value={form?.productDescription}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Colour"
                        id="colour"
                        name="colour"
                        value={form?.colour}
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
                        value={form?.material}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Shape"
                        id="shape"
                        name="shape"
                        value={form?.shape}
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
                        value={form?.quantity}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-32">
                    <div className="flex flex-col w-1/3 justify-center items-center">
                      <h3 className="font-700">PRINTED SIZE</h3>
                    </div>
                    <div className="flex flex-row w-2/3 justify-center pr-92">
                      <TextField
                        required
                        label="A"
                        id="sizeX"
                        name="sizeX"
                        value={form?.sizeX}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="B"
                        id="sizeY"
                        name="sizeY"
                        value={form?.sizeY}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="TEMPLE"
                        id="sizeZ"
                        name="sizeZ"
                        value={form?.sizeZ}
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
                    <div className="flex flex-row w-2/3 justify-center pr-12">
                      <TextField
                        required
                        label="A"
                        id="sizeA"
                        name="sizeA"
                        value={form?.sizeA}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="B"
                        id="sizeB"
                        name="sizeB"
                        value={form?.sizeB}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="DBL"
                        id="sizeDbl"
                        name="sizeDbl"
                        value={form?.sizeDbl}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        required
                        label="ED"
                        id="sizeEd"
                        name="sizeEd"
                        value={form?.sizeEd}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full overflow-scroll flex-wrap mt-10 p-6">
                    {images.map((img, index) => (
                      <div className="mb-8 w-224 mr-6 object-contain">
                        <img
                          className="w-224 h-128 shadow-1 rounded-4"
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
                        value={form?.madeIn}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Company"
                        id="supplier"
                        name="supplier"
                        value={form?.supplier}
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
                        value={form?.supplierAddress}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Contact"
                        id="supplierContact"
                        name="supplierContact"
                        value={form?.supplierContact}
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
                        value={form?.supplierNotes}
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
                    value={form?.ws}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    label="Retail $"
                    id="retailRate"
                    name="retailRate"
                    value={form?.retailRate}
                    variant="outlined"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
}

export default ViewOther;
