export default function MainComunidades() {
    return (
        <main className="w-full flex justify-center items-start p-5">
            <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
                <div className="w-full h-48 p-5 flex flex-col justify-center items-center">
                    <p className="text-slate-900 text-2xl font-bold">Comunidades</p>
                    <p className="text-slate-900 text-lg font-semibold">Conheça nossas comunidades parceiras</p>
                </div>

                <div className="w-full h-auto flex flex-col justify-start items-start p-3">
                    <div className="w-48 h-48 bg-[#e6e6e7] shadow rounded-2xl transition ease-in-out duration-300 hover:-translate-1">
                        <div className="w-full h-36 bg-slate-900 rounded-t-2xl"></div>

                        <div className="w-full h-12 rounded-b-2xl flex justify-center items-center">
                            <p className="text-base text-slate-900 font-bold">Coders Ceara</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}