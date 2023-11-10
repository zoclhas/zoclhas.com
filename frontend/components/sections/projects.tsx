import { GitHub, ExternalLink, Cross } from "@/components/icons";
import { IconButton } from "@/components/icon-button";
import { Button } from "../button";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Project } from "@/payload-types";

export const Projects = ({ projects }: { projects: { docs: Project[] } }) => {
  return (
    <>
      <Link
        href="/projects"
        className="group flex w-max items-center gap-4 transition-opacity ease-in hover:opacity-80"
      >
        <h1 className="text-6xl max-sm:text-4xl">Projects</h1>
        <ChevronRight />
      </Link>
      <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.docs.map((project) => (
          <li
            key={project.id}
            className="group grid w-full grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] shadow-xl transition-all ease-in hover:-translate-y-1 hover:bg-[rgb(var(--secondary-rgb),0.15)] hover:shadow-2xl md:grid-cols-2"
          >
            <div className="relative">
              <Link href={"/projects/" + project.slug} className="block p-2">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API +
                    (project.meta.image.sizes?.card?.url ||
                      project.meta.image.url)
                  }
                  alt={project.meta.image.alt}
                  height={
                    project.meta.image.sizes?.card?.height ||
                    project.meta.image.height
                  }
                  width={
                    project.meta.image.sizes?.card?.width ||
                    project.meta.image.width
                  }
                  className="rounded-lg object-cover object-center"
                />
              </Link>

              <div className="absolute bottom-1 right-1 flex gap-1">
                {project.git_link && (
                  <Link
                    className="grid h-[42px] w-[42px] items-center justify-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-3 backdrop-blur-md transition-colors hover:bg-[rgb(var(--secondary-rgb),0.1)]"
                    href={project.git_link}
                    target="_blank"
                  >
                    <GitHub fill="#fff" height={1.1} />
                  </Link>
                )}
                <Link
                  className="grid h-[42px] w-[42px] items-center justify-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-3 backdrop-blur-md transition-colors hover:bg-[rgb(var(--secondary-rgb),0.1)]"
                  href={project.link}
                  target="_blank"
                >
                  <ExternalLink fill="#fff" height={0.9} />
                </Link>
              </div>
            </div>

            <Link
              href={"/projects/" + project.slug}
              className="flex flex-col justify-between gap-4 p-4"
            >
              <div className="flex flex-col">
                <h2 className="text-4xl">{project.title}</h2>
                <p className="text-xl leading-5">{project.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stacks.slice(0, 5).map((stack, i) => (
                  <div
                    key={project.id + String(i)}
                    className="max-h-8 grow overflow-hidden rounded-xl bg-[rgb(var(--primary-rgb),0.2)] px-2 py-1 text-center"
                  >
                    {stack}
                  </div>
                ))}
                <button className="block w-max grow cursor-pointer justify-self-end rounded-2xl bg-[rgb(var(--secondary-rgb),0.2)] px-4 py-1 text-center font-bold transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.3)]">
                  More Info
                </button>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <div className="rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] px-4 py-4 text-xl">
            &nbsp;
          </div>
        </li>
        <li>
          <Link
            href="/projects"
            className="flex items-center justify-center rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] px-4 py-4 text-center text-xl shadow-xl transition-all ease-in hover:-translate-y-1 hover:bg-[rgb(var(--secondary-rgb),0.15)] hover:shadow-2xl"
          >
            View More
          </Link>
        </li>
      </ul>
    </>
  );

  // return (
  //   <LayoutGroup>
  //     <ul className="grid grid-cols-3 grid-rows-1 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
  //       {projects.map((project, i) => (
  //         <motion.li
  //           key={i + 1}
  //           layoutId={`${i + 1}`}
  //           onClick={() => handleSetIndex(i + 1)}
  //         >
  //           <motion.article
  //             className="group grid h-full cursor-pointer grid-cols-[0.5fr,1.5fr] items-center gap-4 rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] p-4 backdrop-blur-xl transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.15)] max-lg:flex max-lg:flex-col lg:max-h-[300px]"
  //             whileTap={{ scale: 0.99 }}
  //           >
  //             <div className="relative">
  //               <img
  //                 src={project.coverImage}
  //                 alt="Project Cover Image"
  //                 className="w-full max-w-[350px] rounded-xl shadow-lg saturate-0 transition-[filter] ease-in group-hover:saturate-100"
  //                 loading="lazy"
  //               />
  //               <div className="absolute inset-0 h-full w-full rounded-xl bg-[rgb(var(--primary-rgb),0.6)] opacity-100 transition-opacity ease-in group-hover:opacity-0"></div>
  //               <motion.a
  //                 className="absolute bottom-1 right-1 grid items-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md"
  //                 whileHover={{ scale: 1.1 }}
  //                 whileTap={{ scale: 0.9 }}
  //                 href={project.links.site}
  //                 target="_blank"
  //               >
  //                 <ExternalLink fill="#fff" height={0.9} />
  //               </motion.a>
  //             </div>
  //             <div>
  //               <h1 className="text-4xl">{project.title}</h1>

  //               {/* @ts-ignore */}
  //               <ReactMarkdown
  //                 components={{
  //                   a({ children, ...props }) {
  //                     return (
  //                       <a
  //                         {...props}
  //                         target="_blank"
  //                         onClick={(e) => e.preventDefault()}
  //                         className="underline"
  //                       >
  //                         {children}
  //                       </a>
  //                     );
  //                   },
  //                   p({ children }) {
  //                     return <p className="text-lg leading-5">{children}</p>;
  //                   },
  //                 }}
  //               >
  //                 {project.description.split(" ").slice(0, 12).join(" ") +
  //                   "..."}
  //               </ReactMarkdown>

  //               <div className="mt-4 flex flex-row-reverse items-end justify-between">
  //                 <Button
  //                   fill
  //                   onClick={() => index === false && setIndex(i + 1)}
  //                 >
  //                   More Info
  //                 </Button>
  //                 <div className="flex gap-2">
  //                   {project.links.github && (
  //                     <IconButton
  //                       href={project.links.github}
  //                       target="_blank"
  //                       fill
  //                     >
  //                       <GitHub />
  //                     </IconButton>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </motion.article>
  //         </motion.li>
  //       ))}
  //     </ul>
  //     <AnimatePresence>
  //       {index !== false && (
  //         <>
  //           {createPortal(
  //             // @ts-ignore
  //             <motion.div
  //               key="modal"
  //               className="fixed left-0 top-0 z-[3000] grid h-full w-full place-items-center overflow-y-scroll bg-[rgb(var(--primary-rgb),0.7)] p-4 backdrop-blur-xl max-md:fixed"
  //               onClick={(e) => {
  //                 if (e.target === e.currentTarget) {
  //                   handleClose();
  //                 }
  //               }}
  //               variants={{
  //                 hidden: {
  //                   opacity: 0,
  //                   transition: {
  //                     duration: 0.16,
  //                   },
  //                 },
  //                 visible: {
  //                   opacity: 1,
  //                   transition: {
  //                     delay: 0.04,
  //                     duration: 0.2,
  //                   },
  //                 },
  //               }}
  //               initial="hidden"
  //               exit="hidden"
  //               animate="visible"
  //             >
  //               <motion.div layoutId={`${index}`} className="max-w-[800px]">
  //                 <motion.article className="flex h-max items-center gap-4 rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-2xl max-sm:flex-col">
  //                   <div className="relative md:aspect-square md:h-[312px]">
  //                     <img
  //                       src={projects[index - 1].coverImage}
  //                       alt="Projects[index] Cover Image"
  //                       className="rounded-xl  shadow-lg "
  //                     />
  //                     <motion.a
  //                       className="absolute bottom-1 right-1 grid items-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md"
  //                       whileHover={{ scale: 1.1 }}
  //                       whileTap={{ scale: 0.9 }}
  //                       href={projects[index - 1].links.site}
  //                       target="_blank"
  //                     >
  //                       <ExternalLink fill="#fff" height={0.9} />
  //                     </motion.a>
  //                     <motion.button
  //                       className="absolute right-2 top-2 grid items-center rounded-full bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md md:hidden"
  //                       whileHover={{ scale: 1.1 }}
  //                       whileTap={{ scale: 0.9 }}
  //                       onClick={handleClose}
  //                     >
  //                       <Cross fill="#fff" height={0.9} />
  //                     </motion.button>
  //                   </div>
  //                   <div>
  //                     <h1 className="text-5xl">{projects[index - 1].title}</h1>
  //                     {/* @ts-ignore */}
  //                     <ReactMarkdown
  //                       className="card-content"
  //                       components={{
  //                         a({ children, ...props }) {
  //                           return (
  //                             <a
  //                               {...props}
  //                               target="_blank"
  //                               className="underline"
  //                             >
  //                               {children}
  //                             </a>
  //                           );
  //                         },
  //                         p({ children }) {
  //                           return <p className="text-base">{children}</p>;
  //                         },
  //                       }}
  //                     >
  //                       {projects[index - 1].description}
  //                     </ReactMarkdown>
  //                     <div className="mt-2 flex max-w-[500px] flex-wrap gap-2">
  //                       {projects[index - 1].stack.map((s) => (
  //                         <div
  //                           key={s}
  //                           className="max-h-8 grow overflow-hidden rounded-xl bg-[rgb(var(--primary-rgb),0.2)] px-2 py-1 text-center"
  //                         >
  //                           {s}
  //                         </div>
  //                       ))}
  //                     </div>

  //                     <div className="mt-4 flex justify-end gap-2">
  //                       {projects[index - 1].links.github && (
  //                         <IconButton
  //                           target="_blank"
  //                           href={projects[index - 1].links.github || ""}
  //                           fill
  //                         >
  //                           <GitHub />
  //                         </IconButton>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </motion.article>
  //               </motion.div>
  //             </motion.div>,
  //             document.body,
  //           )}
  //         </>
  //       )}
  //     </AnimatePresence>
  //   </LayoutGroup>
  // );
};
