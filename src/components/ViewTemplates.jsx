/*
 - ResumeBuilder - A cool project for Building high quality and ATS friendly resumes in free...
 - Copyright (C) 2025 NishantkSingh0
 - Licensed under the GNU GPL v3.0 - see LICENSE file for details.
 */

 export default function ViewTemplates() {
  const titles=["","Simpler & Structured","Linear & Classic","Colourful & Attractive","Colourful & Highly Designed","Simpler & Linear","Highly Simpler & Classic"]
  const items = [
    {
      img: "/Resume-Builder/Temp/temp1.png",
      title: titles[1],
      templateLink: "https://nishantksingh0.github.io/Generated-Templates/T1",
    },
    {
      img: "/Resume-Builder/Temp/temp2.png",
      title: titles[2],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T2",
    },
    {
      img: "/Resume-Builder/Temp/temp3.png",
      title: titles[3],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T3",
    },
    {
      img: "/Resume-Builder/Temp/temp4.png",
      title: titles[4],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T4",
    },
    {
      img: "/Resume-Builder/Temp/temp5.png",
      title: titles[5],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T5",
    },
    {
      img: "/Resume-Builder/Temp/temp6.png",
      title: titles[6],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T7",
    },
    {
      img: "/Resume-Builder/Temp/temp8.png",
      title: titles[4],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T8",
    },
    {
      img: "/Resume-Builder/Temp/temp9.png",
      title: titles[5],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T9",
    },
    {
      img: "/Resume-Builder/Temp/temp10.png",
      title: titles[6],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T10",
    },
    {
      img: "/Resume-Builder/Temp/temp11.png",
      title: titles[2],
      templateLink: "https://NishantkSingh0.github.io/Generated-Templates/T11",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 dark:bg-slate-900 p-4">
      <h3 className="mt-10 mb-2 text-3xl text-gray-100 dark:text-slate-200 font-bold">Generated Templates</h3>
      <h5 className="mb-4 text-sm md:text-base font-semibold text-gray-500">Note: Consider to View Templates only on desktop mode</h5>
      <div className="w-[200px] h-1 bg-blue-700 mb-16 mx-auto mt-1 rounded dark:bg-blue-500"></div>

      {/* Changed grid-cols-2 to grid-cols-3 for all screen sizes */}
      <div className="grid grid-cols-3 gap-14 sm:grid-cols-3 md:grid-cols-3 max-w-5xl mx-auto place-items-center">
        {items.map((item, index) => (
          <div key={index} className="group relative mb-6 bg-white dark:bg-slate-700 hover:shadow-2xl hover:scale-105 transition-transform duration-[250ms] border-2 dark:shadow-[0_-4px_10px_rgba(0,0,0,0.1)]  border-gray-300 dark:border-gray-700 dark:shadow-gray-800 dark:hover:shadow-gray-600/50 rounded-lg overflow-hidden w-40 sm:w-44 md:w-48 lg:w-64 xl:w-72 flex flex-col items-center">
            {/* Adjust image size */}
            <img src={item.img} alt={item.title} className="w-full h-auto object-cover dark:opacity-80 dark:brightness-80 dark:contrast-90" />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 dark:bg-slate-700 p-4 rounded-md opacity-0 group-hover:opacity-100 transition-transform flex justify-center flex-col items-center">
              <div className="flex space-x-4">
                <div className="flex space-x-2">
                  <a href={item.templateLink} className="text-gray-50 text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md md:hidden" target="_blank">
                    View
                  </a>
                  <a href={item.templateLink} className="text-gray-50 text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md hidden md:block" target="_blank">
                    View Resume
                  </a>
                </div>
              </div>
            </div>
            <div className="font-semibold text-gray-600 dark:text-gray-200 text-xs pb-2 pt-1 md:text-base"> {item.title} </div>
          </div>
        ))}
      </div>
    </div>
  );
}