export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-9 border border-teal-500 justify-evenly items-center rounded-tl-3xl rounded-br-3xl text-center gap-10 ">
      <div className=" md:w-[400px] justify-center flex flex-col">
        <h2 className="text-2xl">
          Want to learn more about Web development with Projects
        </h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with Projects
        </p>
        <button
          outline
          gradientDuoTone="greenToBlue"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://project-lib-mern.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            All Projects
          </a>
        </button>
      </div>
    </div>
  );
}
