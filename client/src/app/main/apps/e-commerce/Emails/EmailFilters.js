import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore, storage } from 'firebase';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
export default function CheckboxLabels() {
  const [isLoading, setisLoading] = useState(true);
  const { form, handleChange, setForm } = useForm(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [disabledState, setDisabledState] = useState(false);



  return (
    <div className="flex flex-col h-260  px-16 py-6">
      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              Filters
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row ">
            <div className="flex-1 flex flex-col ml-20">
              <b><u>SHOWROOM LOCATION</u></b>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.showroomall}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="showroomall"
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.bayside}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="bayside"
                  />
                }
                label="Bayside"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.brooklyndubo}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="brooklyndubo"
                  />
                }
                label="Brooklyn Dubo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.BrooklynBedfordSt}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="BrooklynBedfordSt"
                  />
                }
                label="Brooklyn Bedford St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Closter}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Closter"
                  />
                }
                label="Closter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Flushing}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Flushing"
                  />
                }
                label="Flushing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.GreenwichVillage}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="GreenwichVillage "
                  />
                }
                label="Greenwich Village "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.bayside}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="LongIslandCity"
                  />
                }
                label="Long Island City"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.LongIslandRoslyn}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="LongIslandRoslyn"
                  />
                }
                label="Long Island Roslyn"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Manhattan72ndSt}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Manhattan72ndSt"
                  />
                }
                label="Manhattan 72nd St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ManhattanMottSt}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ManhattanMottSt"
                  />
                }
                label="Manhattan Mott St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.manhattanwallstreet}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="manhattanwallstreet"
                  />
                }
                label="Manhattan Wallstreet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.sunnyside}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="sunnyside"
                  />
                }
                label="Sunny Side"
              />
            
            <br></br><br></br>
            <b><u>STATE BY THE ADDRESS</u></b>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.stateall}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="stateall"
                />
              }
              label="ALL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.California}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="California"
                />
              }
              label="( CA ) California"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.newjersey}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="newjersey"
                />
              }
              label="( NJ ) New Jersey"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.newyork}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="newyork"
                />
              }
              label="( NY ) New York"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Virginia}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Virginia"
                />
              }
              label="( VA ) Virginia"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Maryland}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Maryland"
                />
              }
              label="( MD ) Maryland"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Pennsylvania}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Pennsylvania"
                />
              }
              label="( PA ) Pennsylvania"
            />
           
            </div>
            <div className="flex-1 flex flex-col justify-center ">
            <b><u>GENDER</u></b>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.genderall}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="genderall"
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Male}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Male"
                />
              }
              label="Male"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Female}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Female"
                />
              }
              label="Female"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.genderOther}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="genderOther"
                />
              }
              label="Other"
            />
            <br></br><br></br>
            <b><u>ORDER TYPE</u></b>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.orderOther}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="orderOther"
                />
              }
              label="Other"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ccFrame}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ccFrame"
                />
              }
              label="CC Frame"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.OtherFrame}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="OtherFrame"
                />
              }
              label="Other Frame"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.OwnFrame}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="OwnFrame"
                />
              }
              label="Own Frame"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Sunglass}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Sunglass"
                />
              }
              label="Sunglass"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.polylens}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="polylens"
                />
              }
              label="Lens ( Poly )"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.lensthin}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="lensthin"
                />
              }
              label="Lens ( 1.67 )"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.lensthick}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="lensthick"
                />
              }
              label="Lens ( 1.74 )"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Bluelight}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Bluelight"
                />
              }
              label="Blue light"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.FlatTop}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="FlatTop"
                />
              }
              label="Flat Top"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Progressive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Progressive"
                />
              }
              label="Progressive"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Transition}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Transition"
                />
              }
              label="Transition"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.OtherProduct}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="OtherProduct"
                />
              }
              label="Other Product"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.genderOther}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="genderOther"
                />
              }
              label="Other"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Exam}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Exam"
                />
              }
              label="Exam"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.Insurance}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="Insurance"
                />
              }
              label="Insurance"
            />
            <br></br><br></br>


            <b><u>ETHENICITY</u></b>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ethnecityall}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ethnecityall"
                />
              }
              label="ALL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.WhiteCaucasian}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="WhiteCaucasian"
                />
              }
              label="White / Caucasian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.HispanicLatino}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="HispanicLatino"
                />
              }
              label="Hispanic / Latino"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.BlackAfricanAmerican}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="BlackAfricanAmerican"
                />
              }
              label="Black / African American"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.pureAsian}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="pureAsian"
                />
              }
              label="Asian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.AsianIndiaPakistan}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="AsianIndiaPakistan"
                />
              }
              label="Asian / India and Pakistan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.AIAN}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="AIAN"
                />
              }
              label="American Indian and Alaska Native"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.hawaiislander}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="hawaiislander"
                />
              }
              label="OtheNative Hawaiian and Other Pacific Islanderr"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ethnicityothers}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ethnicityothers"
                />
              }
              label="Others"
            />
            <br></br>
             <Button
              
                className={classes.button}
                variant="contained"
                // color='#f15a25'
                onClick={async () => {
                
                }}>

                Clear All
              </Button>
              <br></br>
            </div>
 <div className="flex-1 flex flex-col  ">

            <b><u>AGE RANGE</u></b>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageall}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageall"
                />
              }
              label="ALL"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageninetyabove}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageninetyabove"
                />
              }
              label="Age between 90+"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageaboveeightyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageaboveeightyfive"
                />
              }
              label="Age between 85 - 89"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageaboveeighty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageaboveeighty"
                />
              }
              label="Age between 80 - 84"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageaboveseventyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageaboveseventyfive"
                />
              }
              label="Age between 75 - 79"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageaboveseventy}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageaboveseventy"
                />
              }
              label="Age between 70 - 74"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovesixtyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovesixtyfive"
                />
              }
              label="Age between 65 - 69"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovesixty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovesixty"
                />
              }
              label="Age between 60 - 64"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefiftyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefiftyfive"
                />
              }
              label="Age between 59 - 55"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefifty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefifty"
                />
              }
              label="Age between 50 - 54"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefourtyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefourtyfive"
                />
              }
              label="Age between 45 - 49"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefourty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefourty"
                />
              }
              label="Age between 40 - 44"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovethirtyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovethirtyfive"
                />
              }
              label="Age between 35 - 39"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovethirty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovethirty"
                />
              }
              label="Age between 30 - 34"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovetwentyfive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovetwentyfive"
                />
              }
              label="Age between 25 - 29"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovetwenty}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovetwenty"
                />
              }
              label="Age between 20 - 24"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefifteen}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefifteen"
                />
              }
              label="Age between 15 -19"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageaboveten}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageaboveten"
                />
              }
              label="Age between 10 - 14"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.ageabovefive}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="ageabovefive"
                />
              }
              label="Age between 5 - 9"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={form?.agebetweenzerotofour}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="agebetweenzerotofour"
                />
              }
              label="Age between 0 - 4"
            />
             <br></br><br></br><br></br><br></br><br></br>
             <br></br><br></br><br></br><br></br><br></br>
            <TextField
                      className="mt-8 mr-40"

                      required
                      label="Zip Code"
                      id="zipCode"
                      type="number"
                      name="zipCode"
                      value={form?.zipCode}
                      onChange={handleChange}
                      variant="outlined"
                      small
                      
                    />
            
            </div>
            
          </div>

        </div>
      </div>

    </div>
  );
}
