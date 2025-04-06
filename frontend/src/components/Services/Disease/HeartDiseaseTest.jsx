import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config";
import DcotorsDropDown from "../../DoctorDropDown/DoctorDropDown";


const HeartDiseaseTest = () => {
  const [inputData, setInputData] = useState({
    Age: "",
    "Sex (Male:1, Female:0)": "",
    "Chest Pain Type": "",
    "Resting Blood Pressure (mm Hg)": "",
    "Serum Cholestoral (mg/dl)": "",
    "Fasting Blood Sugar (1 = true; 0 = false)": "",
    "Resting Electrocardiographic Results": "",
    "Maximum heart rate achieved": "",
    "Exercise Induced Angina (1 = yes; 0 = no)": "",
    "ST Depression Induced by Exercise Relative to Rest": "",
    "Slope of the Peak Exercise ST Segment": "",
    "Number of Major Vessels (0-3) Colored by Flourosopy": "",
    "3 = Normal; 6 = Fixed Defect; 7 = Reversable Defect": "",
  });
  const [prediction, setPrediction] = useState("[0]");
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    const isFormFilled = Object.values(inputData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormFilled) {
      setFormError("Please fill out all fields.");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/heart`, {
        data: inputData,
      });
      // setPrediction(response.data.prediction = '1');
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="m-5 row mb-32">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <h1 className="text-center text-3xl font-bold mb-8">
          Heart Disease Predictor
        </h1>
        <div className="card border border-black rounded-lg p-8">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(inputData).map(([name, value]) => (
                <div key={name} className="col-span-1">
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    name={name}
                    placeholder={`${name}`}
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              {/* Form error message */}
              {formError && (
                <div className="text-red-500 mb-4">{formError}</div>
              )}
              {/* Submit button */}
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                value="Predict"
              />
            </div>
          </form>
          {/* Prediction result */}
          {prediction !== null && (
            <div
              className={`mt-3 ${
                prediction.includes("[1]") ? "bg-red-400" : "bg-green-400"
              } text-2xl`}
            >
              <h3 className="text-center">
                {prediction.includes("[1]")
                  ? "Sorry! Please consult your doctor."
                  : "Great! You are HEALTHY."}{" "}
              </h3>
            </div>
          )}
        </div>
      </div>
      <DcotorsDropDown
        testName={"Diabetes Disease Predictor"}
        testResult={prediction?.includes("[1]") ? "Unhealthy" : "Healthy"}
      />
    </div>
  );
};

export default HeartDiseaseTest;
