import React, {useState} from 'react';
import axios from 'axios';

function Registration() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [country, setCountry] = useState('')
  const [job, setJob] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [contactError, setContactError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [jobError, setJobError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setContactError('');
    setCountryError('');
    setJobError('');

    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!contact.trim()) {
      setContactError('Contact number is required');
      isValid = false;
    }

    if (!country.trim()) {
      setCountryError('Country is required');
      isValid = false;
    }

    if (!job.trim()) {
      setJobError('Job type is required');
      isValid = false;
    }

    if (!termsAccepted) {
      alert('Please accept the Terms of Service.');
      isValid = false;
    }

    if (isValid){
    const url = `https://localhost:44312/api/User/UserRegistration`;

    const data = {
      Name : name,
      Email : email,
      Password : password,
      Contact : contact,
      Country : country,
      JobType : job,
      UserType: ''
    }

    axios.post(url,data)
    .then((result) => {
      clear();
      const dt = result.data;
      alert(dt.statusMessage);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  }

  const handleLogin = () => {
    window.location.href = "/";
  }

  const clear = () =>{
    setName('');
    setEmail('');
    setPassword('');
    setContact('');
    setCountry('');
    setJob('');
  }

  const isValidEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };

    return(
        <section class="vh-100" style={{backgroundColor: "#eee"}}>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{borderRadius: "25px"}}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
      
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register Here!</p>
      
                      <form class="mx-1 mx-md-4">
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="txtName" class={`form-control ${
                              nameError ? 'is-invalid' : ''
                            }`} onChange={(e) => setName(e.target.value)} value={name}/>
                            <label class="form-label" for="form3Example1c">Your Name</label>
                            <div class="invalid-feedback">{nameError}</div>
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="email" id="txtEmail" class={`form-control ${
                              emailError ? 'is-invalid' : ''
                            }`} onChange={(e) => setEmail(e.target.value)} value={email}/>
                            <label class="form-label" for="form3Example3c">Your Email</label>
                            <div class="invalid-feedback">{emailError}</div>
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="txtPassword" class={`form-control ${
                              passwordError ? 'is-invalid' : ''
                            }`} onChange={(e) => setPassword(e.target.value)} value={password}/>
                            <label class="form-label" for="form3Example4c">Password</label>
                            <div class="invalid-feedback">{passwordError}</div>
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="number" id="txtContact" class={`form-control ${
                              contactError ? 'is-invalid' : ''
                            }`} onChange={(e) => setContact(e.target.value)} value={contact}/>
                            <label class="form-label" for="form3Example4cd">Contact No.</label>
                            <div class="invalid-feedback">{contactError}</div>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-earth-americas fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="txtCountry" class={`form-control ${
                              countryError ? 'is-invalid' : ''
                            }`} onChange={(e) => setCountry(e.target.value)} value={country}/>
                            <label class="form-label" for="form3Example4cd">Country Applying</label>
                            <div class="invalid-feedback">{countryError}</div>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-briefcase fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="txtJob" class={`form-control ${
                              jobError ? 'is-invalid' : ''
                            }`} onChange={(e) => setJob(e.target.value)} value={job}/>
                            <label class="form-label" for="form3Example4cd">Job Type</label>
                            <div class="invalid-feedback">{jobError}</div>
                          </div>
                        </div>
      
                        <div class="form-check d-flex justify-content-center mb-5">
                          <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)}/>
                          <label class="form-check-label" for="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
      
                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" class="btn btn-success btn-rounded" style={{ marginRight: '10px' }} onClick={(e) => handleSave(e)}>REGISTER</button>
                          <button type="button" class="btn btn-primary btn-rounded" onClick={(e) => handleLogin(e)}>LOGIN</button>
                        </div>
      
                      </form>
      
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
      
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample image" />
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Registration;