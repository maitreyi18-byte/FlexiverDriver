import './DriverRegistration.css';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DriverDetails from '../Model/DriverDetailsModel';
import CustomTextField from '../Components/CustomTextField';
import logo from '../Assets/logo.png'
import ButtonComp from '../Components/ButtonComp';
import MySupClient from '../SupabaseClient';
import { useNavigate } from 'react-router-dom';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [aBNNo, setABNNo] = useState('');
  const [subUrb, setSubUrb] = useState('');
  const [city, setCity] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [availability, setAvailability] = useState('');
  const [canYouLiftAndGroove, setCanYouLiftAndGroove] = useState('');
  const [flexerTale, setFlexerTale] = useState('');
  const [flexerStyle, setFlexerStyle] = useState('');
  const [lastDanceMove, setLastDanceMove] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [loading, setLoading] = useState(false);
  const driver = new DriverDetails()

  const [supabase] = useState(() => MySupClient());

  let navigate = useNavigate();
  async function insertDriver(driverDetails: DriverDetails) {
    const data = await supabase.from('DriverDetails').insert(driver.toJson())
    if (data.status === 201) {
      alert('Driver Details Inserted Successfully')
      navigate('/driverDashboard')
    } else if (data.status === 409) {
      alert(data!.error!.message)
    }
  }
  const getCurrentUser = async () => {
    const user = await supabase.auth.getSession()
    return user;
  };
  var [userId, setUserId] = useState<string | undefined>()
  var [emailId, setEmailId] = useState<string | undefined>()
  async function checkIfExist() {
    const record = await supabase.from('DriverDetails').select('*').eq('userId', userId)
    console.log("record", record)
    if (record.data!.length === 1) {
      navigate('/driverDashboard')
    } else {
      console.log("No record found")

    }
  }
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        userId = user.data.session!.user.id.toString()
        emailId = user.data.session!.user.email!.toString()
        setUserId(userId)
        setEmailId(emailId)
        console.log(userId)
        console.log(emailId)
        checkIfExist()

      }
    })
  }, [])

  return (
    loading ?
      <div>
        <div >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
        </div>
        Loading...
      </div> :
      <>
        <div className='registrationPage'>
          <div className='logo'>
            <img src={logo} alt="Logo" />
          </div>
          <div className='title'>
            Welcome to the Flexiver<br />Extravaganza!
          </div>
          <div className='subTitle'>
            So, you wanna join the PicUp team of rockstar flexers? Awesome choice! But first, let's jazz up the details. 🎉
          </div>
          <br />
          <div className='boldSideHeading'>
            What You Gotta Bring to the flex Party:
          </div>
          <div className='sideContent'>
            Licence to flex and a Ride to Roll: You gotta have a valid Aussie driver's licence and be the proud owner of a Ute or Van. Bonus points if your vehicle is not just reliable but the superhero of the road, fully insured, and has its own theme music.<br /><br />
            Flex Those Muscles: We're not asking you to bench press a sofa, but you should be able to move large, quirky items without breaking a sweat. Flex those muscles – we're in the business of serious fun here!<br /><br />
            Insurance Galore: You're not just a flexer; you're an insured superhero. Got your public liability and carrier liability insurance sorted? If not, no worries, you can always grab them for your superhero toolkit.<br /><br />
            Charm Offensive: We want communicators who could charm a kangaroo out of a pouch. If you're as honest as a koala's stare and as friendly as a quokka selfie, you're our kind of people.<br /><br />
            SEQ and Northern NSW Showdown: Right now, we're rocking the Brisbane, Ipswich, Gold Coast, and the cool Northern Rivers (NSW). If you're around these parts, you're in for a wild flexer ride.<br /><br />
          </div>
          <br />
          <br />
          <br />
          <div className='boldSideHeading'>
            Fill in the flexer Application Magic Form:
          </div>
          <div id='personalDetails' className='normalSideHeading'>
            PERSONAL DETAILS
          </div>
          <div className="PersonalDetails">
            <div className='horizontal'>
              <CustomTextField onChanged={(e: any) => setFirstName(e.target.value)} placeHolder='First Name' />
              <div className='hspacer' />
              <CustomTextField onChanged={(e: any) => setLastName(e.target.value)} placeHolder='Last Name' />
            </div>

            <div className='horizontal'>
              <CustomTextField type='number' maxLength={10} onChanged={(e: any) => setMobileNo(e.target.value)} placeHolder='Mobile No' />
              <div className='hspacer' />
              <CustomTextField type='number' maxLength={11} onChanged={(e: any) => setABNNo(e.target.value)} placeHolder='ABN No' />
            </div>
            <div className='horizontal'>
              <CustomTextField onChanged={(e: any) => setSubUrb(e.target.value)} placeHolder='SubUrb' />
              <div className='hspacer' />
              <CustomTextField onChanged={(e: any) => setCity(e.target.value)} placeHolder='City' />
            </div>
            <br />
            <br />
            <br />
            <div id='vehicleDetails' className='normalSideHeading'>
              VEHICLE DETAILS
            </div>
            <div className="PersonalDetails">
              <select style={
                {
                  padding: '15px',
                  display: 'flex',
                  border: '2px solid #D69F29',
                  borderRadius: '15px',
                  width: '100%'
                }

              } name="type" 
              onChange={
                (e) => {
                  setVehicleType(e.target.value)
                }
              }>
                <option value="2 weeler">2 Wheeler</option>
                <option value="UTE / Van">UTE / Van</option>
                <option value="Refregerated Van">Refregirated Van</option>
              </select>
              {/* <CustomTextField onChanged={(e: any) => setVehicleType(e.target.value)} placeHolder='Vehicle Type' /> */}
              <div className='vspacer' />
              <CustomTextField onChanged={(e: any) => setVehicleMake(e.target.value)} placeHolder='Vehicle Make' />
              <div className='vspacer' />
              <CustomTextField onChanged={(e: any) => setVehicleModel(e.target.value)} placeHolder='Vehicle Model' />
              <div className='vspacer' />
              <CustomTextField type='number' maxLength={4} onChanged={(e: any) => setVehicleYear(e.target.value)} placeHolder='Vehicle Year' />
            </div>
            <br />
            <br />
            <br />
            <div id='applicationDetails' className='normalSideHeading'>
              APPLICATION
            </div>
            <div className='normalSideContent'>
              Can You Lift and Groove? (Yes or No – we need to know if you can dance with that fridge)
            </div>
            <br />
            <div className='answerTextFieldContainer'>
              <TextField
                multiline={true}
                maxRows={3}
                className='textField'
                InputProps={{
                  disableUnderline: true,
                }}
                variant="standard" placeholder="Answer" onChange={(e) => {
                  setCanYouLiftAndGroove(e.target.value)
                }} />
            </div>
            <div className='normalSideContent'>
              Pitch Your flexer Tale: Why are you the next PicUp sensation?
            </div>
            <br />
            <div className='answerTextFieldContainer'>
              <TextField
                multiline={true}
                maxRows={3}
                className='textField'
                InputProps={{
                  disableUnderline: true,
                }}
                variant="standard" placeholder="Answer" onChange={(e) => {
                  setFlexerTale(e.target.value)
                }} />
            </div>
            <br />
            <br />
            <div id='partyDetails' className='normalSideHeading'>
              PARTY REFERENCES
            </div>
            <div className='normalSideContent'>
              Availability (Days, Hours, When the stars align, etc.)
            </div>
            <br />
            <CustomTextField onChanged={(e: any) => setAvailability(e.target.value)} placeHolder='Answer' />
            <br />
            <div className='normalSideContent'>
              Flexer Style: Are you a solo superstar or do you prefer a duo act? Or are you the Beyoncé of flexing and can do both?
            </div>
            <br />
            <CustomTextField onChanged={(e: any) => setFlexerStyle(e.target.value)} placeHolder='Answer' />
            <br />
            <div id='LastDetails' className='normalSideHeading'>
              LAST DANCE MOVE
            </div>
            <div className='normalSideContent'>
              Insurance Mastery: You know the drill – public liability, CTP car insurance. We need to see your superhero cape (insurance papers) before you officially join the flexer dance floor.
            </div>
            <br />
            <div className='answerTextFieldContainer'>
              <TextField
                multiline={true}
                maxRows={3}
                className='textField'
                InputProps={{
                  disableUnderline: true,
                }}
                variant="standard" placeholder="Answer" onChange={(e) => {
                  setLastDanceMove(e.target.value)
                }} />
            </div>
            <br />
            <div className='normalSideContent'>
              Ready to drop the beat and make some flex-tastic memories? APPLY NOW and let the flexer saga begin! 🚀🎶
            </div>
            <br />
            <br />
            <div className="submit">
              <Button
                sx={{
                  width: "250px",
                  justifyContent: "center",
                  borderRadius: 50,
                  backgroundColor: "#D69F29",
                  color: "white",
                  fontSize: 20,
                  padding: "10px 20px",
                  fontWeight: "bold",
                  transition: "0.5s",
                  animation: "ease",
                  "&:hover": {
                    backgroundColor: "#D69F29",
                    color: "white",
                    fontWeight: "regular",
                    boxShadow: "0px 0px 10px 0px #D69F29",
                  },
                }}
                onClick={
                  () => {
                    if (firstName === '' || lastName === '' || mobileNo === '' || aBNNo === '' || subUrb === '' || city === '' || availability === '' || canYouLiftAndGroove === '' || flexerTale === '' || lastDanceMove === '' || vehicleType === '' || vehicleMake === '' || vehicleModel === '' || vehicleYear === '') {
                      if (firstName === '' || lastName === '' || mobileNo === '' || aBNNo === '' || subUrb === '' || city === '') {
                        var element = document.getElementById('personalDetails');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                      else if (vehicleType === '' || vehicleMake === '' || vehicleModel === '' || vehicleYear === '') {
                        var element = document.getElementById('vehicleDetails');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                      else if (canYouLiftAndGroove === '' || flexerTale === '') {
                        var element = document.getElementById('applicationDetails');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                      else if (availability === '' || flexerStyle === '') {
                        var element = document.getElementById('partyDetails');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                      else {
                        var element = document.getElementById('LastDetails');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                      alert('Please fill all the details')
                      return
                    }
                    driver.firstName = firstName
                    driver.lastName = lastName
                    driver.email = emailId!
                    driver.mobileNo = mobileNo
                    driver.aBNNo = aBNNo
                    driver.subUrb = subUrb
                    driver.city = city
                    driver.isVerified = isVerified
                    driver.availability = availability
                    driver.canYouLiftAndGroove = canYouLiftAndGroove
                    driver.flexerTale = flexerTale
                    driver.flexerStyle = flexerStyle
                    driver.lastDanceMove = lastDanceMove
                    driver.vehicleType = vehicleType
                    driver.vehicleMake = vehicleMake
                    driver.vehicleModel = vehicleModel
                    driver.vehicleYear = vehicleYear
                    driver.userId = userId!
                    insertDriver(driver)
                  }
                } >Submit</Button>
            </div>
            <br />
            <br />
          </div>
        </div >
        <div className='footer'>
          <div className='footerLogo'>
            <div className='logoText'>Flexiver</div>
            <div className='addressText'>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit,
              sed do eiusmod tempor
              incididunt ut labore </div>
          </div>
          <div className='footerContent'>
            <DummyColumn />
            <DummyColumn />
            <DummyColumn />
          </div>
        </div>
      </>



  );
}

export default App;


function DummyColumn() {
  return (
    <div className='footerRightSection'>
      <div>Section Name
      </div>
      <br />
      <br />
      Lorem asd<br />
      Lorem dsa<br />
      Lorem asd <br />
      Lorem asd as<br />
    </div>
  );
}
