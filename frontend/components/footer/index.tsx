export const Footer = () => {
  return (
    <footer className="shadow-default relative isolate z-[1001] mx-auto mb-2 mt-8 flex max-w-3xl grow items-center justify-between gap-2 rounded-3xl bg-gradient-to-t from-gray-100/40 to-gray-100/20 p-2 px-1 text-center backdrop-blur-2xl before:absolute before:inset-0 before:-z-[1] before:block before:h-full before:w-full before:rounded-[26px] before:bg-gradient-to-t before:from-gray-50 before:to-gray-50 before:content-[''] after:absolute after:inset-0 after:-z-[2] after:block after:h-[calc(100%+4px)] after:w-[calc(100%+4px)] after:-translate-x-0.5 after:-translate-y-0.5 after:rounded-[26px] after:bg-gradient-to-b after:from-gray-100 after:to-gray-100 after:content-[''] dark:from-gray-900/20 dark:to-gray-900 dark:before:bg-gradient-to-b before:dark:from-gray-950 before:dark:to-gray-950 dark:after:bg-gradient-to-t after:dark:from-gray-900/0 after:dark:to-gray-900/50">
      <span className="flex grow items-center justify-center">
        Made with 💖. View source on&nbsp;
        <a
          href="https://github.com/zoclhas/zoclhas.com"
          target="_blank"
          className="underline"
        >
          GitHub
        </a>
      </span>
    </footer>
  );
};
