import { PropTypes } from "prop-types";

export default function PersonalInfo({
  personalInfo,
  setPersonalInfo,

}) {
  const handleOnchange = (e) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold  mb-6">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            className={`w-full p-3 border rounded-lg ${
              personalInfo.name === "" && "border-red-500"
            } dark:bg-slate-700 dark:placeholder:text-slate-300`}
            value={personalInfo.name}
            required
            onChange={handleOnchange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`w-full p-3 border rounded-lg ${
              personalInfo.email === "" && "border-red-500"
            } dark:bg-slate-700 dark:placeholder:text-slate-300`}
          value={personalInfo.email}
          required
          onChange={handleOnchange}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          className={`w-full p-3 border rounded-lg ${
              personalInfo.phone === "" && "border-red-500"
            } dark:bg-slate-700 dark:placeholder:text-slate-300`}
          value={personalInfo.phone}
          required
          onChange={handleOnchange}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:placeholder:text-slate-300"
          value={personalInfo.address}
          required
          onChange={handleOnchange}
        />

        <input
          type="text"
          name="linkdin"
          placeholder="linkedin"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:placeholder:text-slate-300"
          value={personalInfo.linkdin}
          onChange={handleOnchange}
        />
        <input
          type="text"
          name="headline"
          placeholder="headline"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:placeholder:text-slate-300"
          value={personalInfo.headline}
          onChange={handleOnchange}
        />
      </div>
    </div>
  );
}

PersonalInfo.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    linkdin: PropTypes.string,
    headline: PropTypes.string,
  }),
  setPersonalInfo: PropTypes.func.isRequired,
};
