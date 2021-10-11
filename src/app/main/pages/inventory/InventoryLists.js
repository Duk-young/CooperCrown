import DemoContent from '@fuse/core/DemoContent';
import DemoSidebarContent from '@fuse/core/DemoSidebarContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import Carousel from 'react-material-ui-carousel';
import moment from 'moment';
import './index.css';

// const useStyles = makeStyles({
// });

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary,
    color: theme.palette.common.black
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

function createData(sku, brand, desc, color, material, shape, size) {
  return { sku, brand, desc, color, material, shape, size };
}

function createInventoryData(
  sku,
  brand,
  desc,
  color,
  material,
  shape,
  size,
  qty
) {
  return { sku, brand, desc, color, material, shape, size, qty };
}

const frameRows = [
  createData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 }
  ),
  createData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 }
  ),
  createData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 }
  ),
  createData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 }
  )
];

const inventoryRows = [
  createInventoryData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 },
    12
  ),
  createInventoryData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 },
    13
  ),
  createInventoryData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 },
    14
  ),
  createInventoryData(
    983799,
    'Supar Future Supar',
    'AAVLALAJTAL',
    'C007-M',
    'ACETATE',
    'ROUND',
    { sm: 20, md: 55, lg: 145 },
    15
  )
];

const historyRows = [
  { date: new Date(), order: 78987 },
  { date: new Date(), order: 78687 },
  { date: new Date(), order: 78098 },
  { date: new Date(), order: 72187 }
];

const itemData = [
  {
    img: 'https://cdn.pixabay.com/photo/2020/07/09/19/11/camera-5388442_960_720.jpg',
    title: 'Lens 1'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/04/20/18/01/camera-lens-2246472_960_720.jpg',
    title: 'Lens 2'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/beautiful-1867614__480.jpg',
    title: 'Lens 3'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/09/09/21/11/eyeglasses-933384_960_720.jpg',
    title: 'Lens 4'
  }
];

function Inventory() {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const pageLayout = useRef(null);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  // const Item = (props) => {
  //   return (
  //     <Paper>
  //       <h2>{props.item.name}</h2>
  //       <p>{props.item.description}</p>

  //       <Button className="CheckButton">Check it out!</Button>
  //     </Paper>
  //   );
  // };

  return (
    <FusePageSimple
      // classes={{
      //   contentWrapper: 'p-0 sm:p-24   h-full', //removed classes sm:pb-80 pb-80
      //   content: 'flex flex-col h-full',
      //   leftSidebar: 'w-256 border-0',
      //   header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      //   wrapper: 'min-h-0'
      // }}
      classes={{
        content: 'flex ',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <Header />
        // <Header
        //   handleClick={handleClick}
        //   handleClose={handleClose}
        //   anchorEl={anchorEl}
        //   setaction={setaction}
        //   name="Purchase Orders"
        //   buttonText={t('Add New Orders')}
        //   navigateTo="/setup/purchase/new"
        // />
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}>
          <Tab className="h-64 normal-case" label="Frames" />
          <Tab className="h-64 normal-case" label="Inventory List" />
          <Tab className="h-64 normal-case" label="Sold History" />
        </Tabs>
      }
      content={
        <>
          {tabValue === 0 && (
            // <div className="px-3">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell align="center">Brand</TableCell>
                    <TableCell align="center">Produt Description</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Material</TableCell>
                    <TableCell align="center">Shape</TableCell>
                    <TableCell align="center">Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {frameRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}>
                      <TableCell component="th" scope="row">
                        {row.sku}
                      </TableCell>
                      <TableCell align="center">{row.brand}</TableCell>
                      <TableCell align="center">{row.desc}</TableCell>
                      <TableCell align="center">{row.color}</TableCell>
                      <TableCell align="center">{row.material}</TableCell>
                      <TableCell align="center">{row.shape}</TableCell>
                      <TableCell align="center" colSpan={3}>
                        <TableRow className="tableRow">
                          <TableCell className="rowCell">
                            {row.size?.sm}
                          </TableCell>
                          <TableCell className="rowCell">
                            {row.size?.md}
                          </TableCell>
                          <TableCell className="rowCell">
                            {row.size?.lg}
                          </TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            // </div>
          )}
          {tabValue === 1 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell align="center">Brand</TableCell>
                    <TableCell align="center">Product Description</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Material</TableCell>
                    <TableCell align="center">Shape</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    <TableCell align="center">Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}>
                      <TableCell component="th" scope="row">
                        {row.sku}
                      </TableCell>
                      <TableCell align="center">{row.brand}</TableCell>
                      <TableCell align="center">{row.desc}</TableCell>
                      <TableCell align="center">{row.color}</TableCell>
                      <TableCell align="center">{row.material}</TableCell>
                      <TableCell align="center">{row.shape}</TableCell>
                      <TableCell align="center">{row.qty}</TableCell>
                      <TableCell align="center" colSpan={3}>
                        <TableRow className="tableRow">
                          <TableCell className="rowCell">
                            {row.size?.sm}
                          </TableCell>
                          <TableCell className="rowCell">
                            {row.size?.md}
                          </TableCell>
                          <TableCell className="rowCell">
                            {row.size?.lg}
                          </TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tabValue === 2 && (
            <>
              {/* <div
                className="grid grid-cols-3 gap-4"
                style={{ border: '1px solid black' }}>
                <div className=""> */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Order No.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {historyRows.map((row, ind) => (
                          <TableRow
                            key={ind}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}>
                            <TableCell>{ind + 1}</TableCell>
                            <TableCell align="center">
                              {moment(row.date).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell align="center">{row.order}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Carousel
                    NextIcon={<ArrowForwardIosIcon />}
                    PrevIcon={<ArrowBackIosIcon />}
                    // OR
                    // NextIcon={<img src="http://random.com/next" />}
                    // PrevIcon={<img src="http://random.com/prev" />}
                  >
                    <ImageList sx={{ width: 500, height: 450 }}>
                      {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                            position="below"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    {/* {itemData.map((item, ind) => (
                      <img
                        width="90%"
                        key={ind}
                        src={item.img}
                        // src={`${item.img}?w=248&fit=crop&auto=format`}
                        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    ))} */}
                  </Carousel>
                  {/* <div className="">Carousal</div> */}
                </Grid>
              </Grid>

              {/* </div>
              </div> */}
            </>
          )}
        </>
      }
      innerScroll
    />
  );
}

export default Inventory;
