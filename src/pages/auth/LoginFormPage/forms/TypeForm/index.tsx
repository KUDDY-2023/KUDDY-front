import "./typeform.scss";

export default function TypeForm() {
  return (
    <div className="type-form-container">
      <p className="title">Choose your user type</p>
      <div className="form-container">
        <div className="btn-container">
          <div id="k-buddy">K-buddy</div>
          <p>Korean Users Providing Guided Services</p>
        </div>
        <div className="btn-container">
          <div id="traveler">traveler </div>
          <p>Non-Korean Users Looking for K-buddy</p>
        </div>
      </div>
    </div>
  );
}
