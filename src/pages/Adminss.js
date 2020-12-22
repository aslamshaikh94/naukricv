import React, { useEffect, useState, useContext } from "react";
import { Axios } from "../api/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AppContext } from "../App";

const Admin = () => {
  const { data, dispatch } = useContext(AppContext);
  const [userAuth, setUserAuth] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const {
    profile_name,
    first_name,
    last_name,
    about,
    address,
    designation,
    mobile,
    skills,
    languages,
  } = { ...userAuth };

  console.log(userAuth);

  useEffect(() => {
    Axios.get(`/users`)
      .then((res) => {
        if (res.data) dispatch({ type: "USER_DATA", payload: res.data });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (data.userdata) {
      let { user_info, experience, projects, ...all } = data.userdata;
      setUserAuth({ ...user_info, ...experience, ...projects, ...all });
    }
  }, [data.userdata]);

  const inputHandaler = (e) => {
    const { name, value } = e.target;
    setUserAuth({ ...userAuth, [name]: value });
  };

  const addSkillsHandaler = () => {
    const { skill, percent, skills } = userAuth;
    setUserAuth({ ...userAuth, skills: [...skills, { skill, percent }] });
  };

  const addLanguagesHandaler = () => {
    const { language, percent, languages } = userAuth;
    setUserAuth({
      ...userAuth,
      languages: [...languages, { language, percent }],
    });
  };

  const saveExperienceHandaler = () => {};

  const saveHandaler = () => {
    Axios.put(`/users`, userAuth)
      .then((res) => {
        let { token, status, message } = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="box">
          <h4 className="heading">Profile</h4>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Profile Name</label>
              <input
                type="text"
                name="profile_name"
                defaultValue={profile_name}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Designation</label>
              <input
                type="email"
                name="designation"
                defaultValue={designation}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>First Name</label>
              <input
                type="email"
                name="first_name"
                defaultValue={first_name}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Last Name</label>
              <input
                type="email"
                name="last_name"
                defaultValue={last_name}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Mobile Number</label>
              <input
                type="number"
                name="mobile"
                defaultValue={mobile}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Location</label>
              <input
                type="text"
                name="address"
                defaultValue={address}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark" onClick={saveHandaler}>
              SAVE
            </button>
          </div>
        </div>
        <div className="box">
          <h4 className="heading">About</h4>
          <div className="form-group">
            <label>About Me</label>
            <textarea
              className="form-control"
              name="about"
              rows={4}
              defaultValue={about}
              onChange={inputHandaler}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark" onClick={saveHandaler}>
              SAVE
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="box">
              <h4 className="heading">Skills</h4>
              <div className="skillBadgeGroup">
                {skills &&
                  skills.map((item, i) => (
                    <span className="skillBadge" key={item.skill + i}>
                      {item.skill}: {item.percent}
                    </span>
                  ))}
              </div>
              <div className="form-group input-group">
                <input
                  type="text"
                  placeholder="HTML"
                  name="skill"
                  className="form-control"
                  onChange={inputHandaler}
                />
                <input
                  type="text"
                  placeholder="Percent"
                  name="percent"
                  className="form-control"
                  onChange={inputHandaler}
                />
                <div className="input-group-prepend">
                  <button className="btn btn-dark" onClick={addSkillsHandaler}>
                    Add
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark" onClick={saveHandaler}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="box">
              <h4 className="heading">Languages</h4>
              <div className="skillBadgeGroup">
                {languages &&
                  languages.map((item, i) => (
                    <span className="skillBadge" key={item.language + i}>
                      {item.language}: {item.percent}
                    </span>
                  ))}
              </div>
              <div className="form-group input-group">
                <input
                  type="text"
                  placeholder="Language"
                  name="language"
                  className="form-control"
                  onChange={inputHandaler}
                />
                <input
                  type="text"
                  placeholder="Percent"
                  name="percent"
                  className="form-control"
                  onChange={inputHandaler}
                />
                <div className="input-group-prepend">
                  <button
                    className="btn btn-dark"
                    onClick={addLanguagesHandaler}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark" onClick={saveHandaler}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <h4 className="heading">Work Experience</h4>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Employer</label>
              <input
                type="text"
                name="employer"
                defaultValue={first_name}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Designation</label>
              <input
                type="email"
                name="designation"
                defaultValue={last_name}
                className="form-control"
                onChange={inputHandaler}
              />
            </div>
            <div className="form-group col-md-3">
              <label>From</label>
              <DatePicker
                selected={startDate}
                className="form-control"
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>To</label>
              <DatePicker
                selected={startDate}
                className="form-control"
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Describe your Job Profile</label>
              <textarea
                className="form-control"
                name="describe"
                rows={4}
                defaultValue={about}
                onChange={inputHandaler}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark" onClick={saveExperienceHandaler}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
