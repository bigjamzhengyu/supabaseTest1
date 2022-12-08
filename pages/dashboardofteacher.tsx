import WordCard2 from "@/components/WordCard2";

export default function DashBoardOfTeacher() {

  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            DashBoard Of Teacher
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Some words to give the message.
          </p>
        </div>
        <div className="min-h-screen flex justify-center items-center flex-wrap">
          <div className="bg-gradient-to-r from-blue-500 to-blue-300
                          w-96 h-56 m-auto bg-blue-500 rounded-xl shadow-2xl 
                          transform hover:scale-110 transition-transform">
            <div className="w-full px-8 absolute top-6">
              <div className="flex justify-between">
                <div>
                  <p className="font-light">Teacher Name</p>
                  <p className="text-lg font-medium tracking-widest">
                    Tokyo 太郎
                  </p>
                </div>
                <div>
                  画像
                </div>
              </div>
              <div className="pt-2">
                <p className="font-light">Subject</p>
                <p className="text-lg font-medium tracking-widest">
                  Language（Japanese、English）
                </p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light text-xs">
                      Date
                    </p>
                    <p className="font-bold tracking-more-wider text-sm">
                      2021-03-16
                    </p>
                  </div>
                  <div>
                    <p className="font-light text-xs">
                      Class No.
                    </p>
                    <p className="font-bold tracking-more-wider text-sm">
                      20
                    </p>
                  </div>
                  <div>
                    <p className="font-light text-xs">
                      Status
                    </p>
                    <p className="font-bold tracking-more-wider text-sm">
                      Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-300
                          w-96 h-56 m-auto bg-blue-500 rounded-xl shadow-2xl 
                          transform hover:scale-110 transition-transform">
            <div className="w-full px-8 absolute top-6">
              
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-300
                          w-96 h-56 m-auto bg-blue-500 rounded-xl shadow-2xl 
                          transform hover:scale-110 transition-transform">
            <div className="w-full px-8 absolute top-6">
              
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-300
                          w-96 h-56 m-auto bg-blue-500 rounded-xl shadow-2xl 
                          transform hover:scale-110 transition-transform">
            <div className="w-full px-8 absolute top-6">
              
            </div>
          </div>
        </div>
      </div>
      <div>
        <WordCard2 />
      </div>
    </section>
  );
}
