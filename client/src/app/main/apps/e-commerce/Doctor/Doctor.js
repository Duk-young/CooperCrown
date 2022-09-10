// import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseLoading from '@fuse/core/FuseLoading';
// import FusePageCarded from '@fuse/core/FusePageCarded';
// import { useForm, useDeepCompareEffect } from '@fuse/hooks';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import { useTheme } from '@material-ui/core/styles';
// import Tab from '@material-ui/core/Tab';
// import {makeStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import withReducer from 'app/store/withReducer';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import * as Actions from '../store/actions';
// import reducer from '../store/reducers';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 450
//   },
//   button: {
//     backgroundColor: '#f15a25',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#f47b51',
//       color: '#fff'
//     }
//   }
// });
// function Doctor(props) {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
//   const theme = useTheme();

//   const [tabValue, setTabValue] = useState(0);
//   const [isLoading, setisLoading] = useState(false);
//   const { form, handleChange, setForm } = useForm(null);

//   const routeParams = useParams();

//   useDeepCompareEffect(() => {
//     const updateProductState = async () => {
//       setisLoading(false);
//       const { doctorId } = routeParams;

//       if (doctorId === 'new') {
//         dispatch(Actions.newDoctor());
//         setisLoading(true);
//       } else {
//         Actions.sav
//         await dispatch(await Actions.getDoctor(doctorId));
//         setisLoading(true);
//       }
//     };

//     updateProductState();
//   }, [dispatch, routeParams]);

//   useEffect(() => {
//     if (
//       (product.data && !form) ||
//       (product.data && form && product.data.id !== form.id)
//     ) {
//       setForm(product.data);
//     }
//   }, [form, product.data, setForm]);

//   function handleChangeTab(event, value) {
//     setTabValue(value);
//   }

//   function canBeSubmitted() {
//     return (
//       form.docname.length > 0 &&
//       form.locationAddress.length > 0 &&
//       form.State.length > 0 &&
//       form.City.length > 0 &&
//       form.zipCode.length > 0
//     );
//   }

//   if (
//     (!product.data ||
//       (product.data && routeParams.doctorId !== product.data.id)) &&
//     routeParams.doctorId !== 'new' &&
//     !isLoading
//   ) {
//     return <FuseLoading />;
//   }

//   return (
//     <FusePageCarded
//       header={
//         form && (
          
//           <div className="flex flex-1 w-full items-center justify-between">
//             <div className="flex flex-col items-start max-w-full">
//               <FuseAnimate animation="transition.slideRightIn" delay={300}>
//                 <Typography
//                   className="normal-case flex items-center sm:mb-12"
//                   component={Link}
//                   role="button"
//                   to="/apps/e-commerce/doctors"
//                   color="inherit">
//                   <Icon className="text-20">
//                     {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
//                   </Icon>
//                   <span className="mx-4">Doctor</span>
//                 </Typography>
//               </FuseAnimate>

//               <div className="flex items-center max-w-full">
//                 <FuseAnimate animation="transition.expandIn" delay={300}>
//                   <img
//                     className="w-32 sm:w-48 rounded"
//                     src="assets/images/ecommerce/product-image-placeholder.png"
//                     alt={form.docname}
//                   />
//                 </FuseAnimate>
//                 <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
//                   <FuseAnimate animation="transition.slideLeftIn" delay={300}>
//                     <Typography className="text-16 sm:text-20 truncate">
//                       {form.docname ? form.docname : 'New Doctor'}
//                     </Typography>
//                   </FuseAnimate>
//                   <FuseAnimate animation="transition.slideLeftIn" delay={300}>
//                     <Typography variant="caption">Doctor Detail</Typography>
//                   </FuseAnimate>
//                 </div>
//               </div>
//             </div>
//             {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
//               <Button
//                 className="whitespace-no-wrap normal-case"
//                 variant="contained"
//                 color="secondary"
//                 disabled={!canBeSubmitted()}
//                 onClick={async () => {
//                   if (routeParams.doctorId === 'new') {
//                     setisLoading(false);
//                     await dispatch(await Actions.saveShowRoom(form));
//                     setisLoading(true);
//                     props.history.push(`/apps/e-commerce/showRooms`);
//                   } else {
//                     setisLoading(false);
//                     await dispatch(await Actions.updateShowRoom(form));
//                     setisLoading(true);
//                     props.history.push(`/apps/e-commerce/showRooms`);
//                   }
//                 }}>
//                 Save
//               </Button>
//             </FuseAnimate> */}
//           </div>
//         )
//       }
//       contentToolbar={
//         <Tabs
//           value={tabValue}
//           onChange={handleChangeTab}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="scrollable"
//           scrollButtons="auto"
//           classes={{ root: 'w-full h-64' }}>
//           <Tab className="h-64 normal-case" label="New Doctor" />
//         </Tabs>
//       }
//       content={
//         form && (
//           <div className="flex flex-col h-260  px-16 py-6">
//         <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
//           <div className="flex flex-row justify-center border-b-1 border-black border-solid">
//             <h1 className="font-700" style={{ color: '#f15a25' }}>
//             USER INFO
//             </h1>
//           </div> 
//           <div className="p-16 sm:p-24 max-w-2xl ">
//             {tabValue === 0 && (
//               <div>
//                 <TextField
//                   className="mt-8 "
                 
//                   error={form.docname === ''}
//                   required
//                   label="Location Name"
//                   autoFocus
//                   id="docname"
//                   name="docname"
//                   value={form.docname}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />

//                 <TextField
//                   className="mt-8 "
                 
//                   id="locationAddress"
//                   name="locationAddress"
//                   onChange={handleChange}
//                   label="Location Address"
//                   type="text"
//                   value={form.locationAddress}
//                   multiline
//                   rows={5}
//                   variant="outlined"
//                   fullWidth
//                 />
//                 <TextField
//                   className="mt-8 "
                 
//                   required
//                   label="City"
//                   type="text"
//                   id="City"
//                   name="City"
//                   value={form.City}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />
//                 <TextField
//                   className="mt-8 "
                 
//                   required
//                   label="State"
//                   id="State"
//                   type="text"
//                   name="State"
//                   value={form.State}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />
//                 {/* <div className="flex flex-row justify-between w-full"> */}
//                   <TextField
//                     className="mt-8  pr-4"
                   
//                     required
//                     label="Phone No.1"
//                     id="phoneNo"
//                     name="phoneNo"
//                     value={form.phoneNo}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                   />
//                     <TextField
//                     className="mt-8  pr-4"
                   
//                     required
//                     label="Phone No.2"
//                     id="phoneNo1"
//                     name="phoneNo2"
//                     value={form.phoneNo2}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                   />
//                   {/* <TextField
//                     className="mt-8 "
                   
//                     required
//                     label="Fax No."
//                     id="faxNo"
//                     name="faxNo"
//                     value={form.faxNo}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                   /> */}
//                 {/* </div> */}
//                 <TextField
//                   className="mt-8 "
                 
//                   required
//                   label="Email"
//                   id="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />
//                 <TextField
//                   className="mt-8 "
                 
//                   required
//                   label="Zip Code"
//                   id="zipCode"
//                   type="number"
//                   name="zipCode"
//                   value={form.zipCode}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />
//                 <TextField
//                   className="mt-8 "
//                   label="Other "
//                   id="other1"
//                   name="other1"
//                   value={form.other1}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                 />
              
//               </div>
//             )}
//           </div>
//             <br></br> 
//           </div>
//           <div className="flex flex-col p-12 " >              
//               {/* <Button 
//               className={classes.button}
//               variant="contained"
//               color="secondary"
//               onClick={async () => {
//                 if (routeParams.doctorId === 'new') {
//                   setisLoading(false);
//                   await dispatch(await Actions.saveShowRoom(form));
//                   setisLoading(true);
//                   props.history.push(`/apps/e-commerce/showRooms`);
//                 } else {
//                   setisLoading(false);
//                   await dispatch(await Actions.updateShowRoom(form));
//                   setisLoading(true);
//                   props.history.push(`/apps/e-commerce/showRooms`);
//                 }
//               }}>
                 
//                 Save
//               </Button> */}
//            </div>
//           </div>

         
//         )
//       }
//       innerScroll
//     />
//   );
// }

// export default withReducer('eCommerceApp', reducer)(Doctor);
