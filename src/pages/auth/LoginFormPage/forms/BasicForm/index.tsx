import "./basicform.scss";

export default function BasicForm() {
  return (
    <div className="type-form-container">
      <p className="title">Fill your basic information</p>

      <div className="form-container">
        <div>
          <p>Gender</p>
          <p>Age</p>
        </div>
        <div>
          <div>
            <button>Mr</button>
            <button>Ms</button>
          </div>
          <input type="number" placeholder="10" />
        </div>
      </div>
    </div>
  );
}
