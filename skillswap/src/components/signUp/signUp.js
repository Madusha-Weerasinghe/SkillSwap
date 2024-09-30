import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./signUp.css";
import { signin } from "../../service/signIn/signInService";
import { useNavigate } from "react-router-dom";
import countries from "./countries";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { signUp } from "../../service/signIn/signInService";

const Overlay = ({ show, onClose }) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pwdCheck, setPwdCheck] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [skill, setSkill] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const refreshForm = () => {
    setText("");
    setAge("");
    setConfirmPassword("");
    setCountry("");
    setEmail("");
    setGender("");
    setImageUpload("");
    setImageUrl();
    setPassword("");
    setPwdCheck("");
    setUserName("");
    setIsChecked(false);
  };

  const createAUser = async () => {
    try {
      const user = await signUp(
        userName,
        password,
        email,
        age,
        country,
        skill,
        followers,
        following,
        gender,
        imageURL
      );

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!show) {
      setStep(0);
      // Reset step when modal is hidden
    }
  }, [show]);

  const handleClose = () => {
    onClose();
    refreshForm(); // Call parent onClose
  };

  const handleNext = () => {
    if (
      password === "" ||
      userName === "" ||
      email === "" ||
      confirmpassword === ""
    ) {
      setPwdCheck(1);
    } else if (password !== confirmpassword) {
      setPwdCheck(2);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleNext2 = () => {
    uploadImage();
    console.log(userName);
    console.log(email);
    console.log(confirmpassword);
    console.log(age);

    if (age === "" || gender === "" || country === "") {
      setPwdCheck(3);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = () => {
    if (!isChecked) {
      setPwdCheck(4);
    } else {
      createAUser();
      refreshForm();
      onClose();
    }

    console.log(age);
    console.log(gender);
    console.log(country);
    console.log(imageURL);
  };

  useEffect(() => {
    // This will run whenever pwdCheck changes
    console.log("pwdCheck value:", pwdCheck);
    console.log(step);
  }, [pwdCheck, step]);

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `coverImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
          console.log("Image URL:", url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });
  };

  const logIn = async () => {
    try {
      const data = await signin(text, password);

      setUserData(data);
      localStorage.setItem("token", data.token);

      if (data) {
        // navigate(`/community/${data.user._id}`);
        navigate(`/chat/${data.user._id}`);
      } else {
        alert("email or password incorrect");
      }
    } catch (error) {
      throw error;
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Assigns true when checked, false when unchecked
  };

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        {step === 0 && (
          <div className="step0">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={handleClose}
              id="closeIcon"
            />

            <p>
              <span id="title">Sign Up</span>
              <br></br>
              <span id="subTitle">Stay proficient by learning new skills.</span>
            </p>
            <p>
              <span id="userName">User Name</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
              />
            </p>

            <p>
              <span id="email">Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Password"
              />
            </p>

            <p>
              <span id="password">Password</span>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </p>

            <p>
              <span id="confirmpassword">Confirm Password</span>
              <input
                type="text"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </p>

            {pwdCheck === 1 && (
              <>
                <p id="warningText">Fields are connot be empty</p>
              </>
            )}
            {pwdCheck === 2 && (
              <>
                <p id="warningText">Password is not matching</p>
              </>
            )}

            <button id="signInBtn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="step0">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={onClose}
              id="closeIcon"
            />

            <p>
              <span id="title">Sign Up</span>
              <br></br>
              <span id="subTitle">Stay proficient by learning new skills.</span>
            </p>

            <div className="step2top">
              <div className="ageSection">
                <p>
                  <span id="age">Age</span>
                  <br></br>
                  <select
                    id="ageBox"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <option value="">Select Age</option>

                    {Array.from({ length: 91 }, (_, i) => i + 10).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
              <div className="genderSection">
                <p>
                  <span id="gender">Gender</span>
                  <br></br>
                  <select
                    id="genderBox"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </p>
              </div>
            </div>

            <p>
              <span id="country">Country</span>
              <br></br>
              <select
                id="countryBox"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </p>

            <p>
              <span id="uploadImage">Upload Profile Image</span>

              <input
                id="profileImg"
                type="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
                accept="image/*"
              />
            </p>

            {imageUpload && (
              <div className="proImage">
                <img src={URL.createObjectURL(imageUpload)}></img>
              </div>
            )}

            {pwdCheck === 3 && (
              <>
                <p>Fields are connot be empty</p>
              </>
            )}

            <button id="signInBtn" onClick={handleNext2}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step0">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={onClose}
              id="closeIcon"
            />

            <p>
              <span id="title">Sign Up</span>
              <br></br>
              <span id="subTitle">Stay proficient by learning new skills.</span>
            </p>

            <p>privacy and policy</p>

            <div className="agreement">
              <p id="policy">
                <span>
                  At SkillSwap, we are deeply committed to safeguarding the
                  privacy of our users. We collect personal information such as
                  your name, email address, and any other details you provide
                  during account registration. This data helps us enhance your
                  experience on the platform by facilitating skill exchanges and
                  communication between users. We also collect usage data, such
                  as your interactions within the platform, to improve our
                  services, personalize your experience, and ensure the platform
                  runs smoothly.
                </span>
                <br></br>
                <br></br>
                <span>
                  Your privacy is important to us, and we take several measures
                  to protect your personal information from unauthorized access
                  or disclosure. We use secure protocols and store your data on
                  protected servers. While we strive to maintain the highest
                  levels of security, it is important to understand that no
                  method of transmitting or storing data is completely secure.
                  As such, we cannot guarantee the absolute security of your
                  information
                </span>
                <br></br>
                <br></br>
                <span>
                  We do not sell, rent, or share your personal information with
                  third parties except under specific circumstances, such as
                  when required by law or with your explicit consent. In certain
                  cases, we may share your data with trusted service providers
                  who assist in operating our platform, but only to the extent
                  necessary to provide the service. These providers are bound by
                  strict confidentiality agreements to ensure your data is
                  protected.
                </span>
                <br></br>
                <br></br>
                <span>
                  You have certain rights regarding your personal information,
                  including the right to access, modify, or delete your data. If
                  you wish to exercise any of these rights or have questions
                  about how we handle your personal information, you can contact
                  us at [Insert Contact Information]. We aim to be transparent
                  with our practices and are happy to address any concerns you
                  may have.
                </span>
                <br></br>
                <br></br>
                <span>
                  By using SkillSwap, you agree to the collection and use of
                  your information as outlined in this policy. We may update
                  this policy from time to time to reflect changes in our
                  practices or legal requirements. We encourage you to review
                  this page periodically to stay informed about how we protect
                  your data. Any updates will be posted here, with the date of
                  the latest revision.
                </span>
              </p>
            </div>

            <div className="agrementCheck">
              <div>
                <input
                  type="checkbox"
                  id="agree"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label htmlFor="agree" id="statement">
                  &nbsp; I agree to the terms and conditions
                </label>
              </div>
            </div>

            {pwdCheck === 4 && (
              <>
                <p>Need to agree with terms and conditions</p>
              </>
            )}

            <button id="signInBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        <br></br>
      </div>
    </div>
  );
};

export default Overlay;
