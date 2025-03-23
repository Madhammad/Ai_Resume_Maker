const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        About Ai Resume Maker
      </h1>
      <p className="text-lg  mb-4">
        Welcome to <span className="font-semibold">Resume Maker</span>, your
        ultimate tool for creating professional resumes effortlessly. Our
        platform allows users to generate resumes and download them for free.
        With the power of AI, we help craft concise and compelling resume
        summaries tailored to your experience and skills.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Features</h2>
      <ul className="list-disc list-inside   mb-4">
        <li className="text-green-600">Create resumes quickly and easily</li>
        <li className="text-green-600">AI-powered summary generation</li>
        <li className="text-green-600">Download your resume for free</li>
        <li className="text-green-600">User-friendly and efficient design</li>
      </ul>
      <p className="text-lg">
        Our mission is to simplify the resume-building process, ensuring you
        present the best version of yourself to potential employers. Start
        crafting your resume today and take a step closer to your dream job!
      </p>
    </div>
  );
};

export default About;
