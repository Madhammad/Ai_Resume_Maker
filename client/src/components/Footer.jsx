import Logo from "./helper/Logo";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 bg-slate-100 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Logo />
        <p className="text-sm text-gray-400 mt-2">
          Build professional resumes quickly , easily & Free .
        </p>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
