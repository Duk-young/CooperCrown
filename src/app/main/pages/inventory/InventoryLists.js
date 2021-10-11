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

const useStyles = makeStyles({
  layoutRoot: {}
});

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function CardedLeftSidebarTabbedSample() {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const pageLayout = useRef(null);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

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
                <TableHead color="primary">
                  <TableRow>
                    <StyledTableCell>SKU</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">
                      Produt Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Color</StyledTableCell>
                    <StyledTableCell align="center">Material</StyledTableCell>
                    <StyledTableCell align="center">Shape</StyledTableCell>
                    <StyledTableCell align="center">Size</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}>
                      <TableCell align="center" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
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
                    <TableCell align="center">SKU</TableCell>
                    <TableCell align="center">Brand</TableCell>
                    <TableCell align="center">Product Description</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Material</TableCell>
                    <TableCell align="center">Shape</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Qty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}>
                      <TableCell align="center" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tabValue === 2 && (
            <>
              {/* <div className="row w-100" style={{ border: '1px solid black' }}>
                <div className="col-xs-12 col-md-7"> */}
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Order No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </div>
                <div className="col-xm-12 col-md-5">Carousal</div>
              </div> */}
            </>
          )}
        </>
      }
      innerScroll
    />
  );
}

export default CardedLeftSidebarTabbedSample;
