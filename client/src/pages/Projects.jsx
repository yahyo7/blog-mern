import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Explore a collection of innovative and impactful projects showcasing
        expertise in web development, backend systems, cloud solutions, and
        DevOps practices. From dynamic web applications to scalable cloud
        architectures, each project highlights the use of cutting-edge
        technologies and best practices. Dive into detailed case studies, view
        project demos, and see how complex challenges were transformed into
        successful solutions.
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
